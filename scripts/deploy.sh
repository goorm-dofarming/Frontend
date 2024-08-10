#!/bin/bash
# set -e

LOG_FILE="/var/log/deploy.log"

# 로그 파일이 없다면 생성
if [ ! -f "$LOG_FILE" ]; then
    sudo touch "$LOG_FILE"
    sudo chown ubuntu:ubuntu "$LOG_FILE"
    sudo chmod 644 "$LOG_FILE"
fi

echo "$(date): Deploy script is starting..." >> $LOG_FILE

# 권한 부여
echo "Changing ownership and permissions..." >> $LOG_FILE
sudo chown -R ubuntu:ubuntu /home/ubuntu/deploy
sudo chmod -R 755 /home/ubuntu/deploy

# 작업 디렉토리로 이동
cd /home/ubuntu/deploy

# 패키지 설치
echo "Installing packages..." >> $LOG_FILE
pnpm install

# 애플리케이션 시작 또는 재시작
echo "Starting or resurrecting the application..." >> $LOG_FILE
sudo pm2 resurrect || sudo pm2 start npm --name "Frontend" -- start

echo "Deployment finished successfully." >> $LOG_FILE
