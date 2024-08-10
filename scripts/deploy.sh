#!/bin/bash
# set -e

LOG_FILE="/var/log/deploy.log"

echo "$(date): Deploy script is starting..." >> $LOG_FILE

# 권한 부여
echo "Changing ownership and permissions..." >> $LOG_FILE
sudo chown -R ubuntu:ubuntu /home/ubuntu/deploy
sudo chmod -R 755 /home/ubuntu/deploy

# 작업 디렉토리로 이동
cd /home/ubuntu/deploy

# 로그 파일 초기화
echo "Deploy script started" >> $LOG_FILE  # 로그 파일을 초기화합니다.

# 캐시 정리
echo "Cleaning pnpm store..." >> $LOG_FILE
sudo pnpm store prune
# 기존 node_modules 및 관련 디렉터리 삭제
echo "Removing existing node_modules and build directories..." >> $LOG_FILE
sudo rm -rf node_modules

# node_modules 삭제 확인
if [ ! -d "node_modules" ]; then
    echo "node_modules directory successfully deleted." >> $LOG_FILE
else
    echo "Failed to delete node_modules directory." >> $LOG_FILE
fi

# 패키지 설치
echo "Installing packages..." >> $LOG_FILE
pnpm install

# 빌드 단계
echo "Building the project..." >> $LOG_FILE
pnpm build --verbose | tee build_log.txt

# 애플리케이션 시작 또는 재시작
echo "Starting or resurrecting the application..." >> $LOG_FILE
sudo pm2 resurrect || sudo pm2 start npm --name "Frontend" -- start
echo "Deployment finished successfully." >> $LOG_FILE
