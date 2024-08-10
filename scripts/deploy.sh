#!/bin/bash
set -e  # 에러 발생 시 스크립트 중단

REPOSITORY=/home/ubuntu/deploy

# 작업 디렉토리로 이동
cd $REPOSITORY

# 로그 파일 초기화
echo "Deploy script started" > error_log.txt  # 로그 파일을 초기화합니다.

# 권한 부여
echo "Changing ownership and permissions..." >> error_log.txt 2>&1
sudo chown -R ubuntu:ubuntu $REPOSITORY >> error_log.txt 2>&1
sudo chmod -R 755 $REPOSITORY >> error_log.txt 2>&1

# 캐시 정리
echo "Cleaning pnpm store..." >> error_log.txt 2>&1
pnpm store prune >> error_log.txt 2>&1

# 기존 node_modules 및 관련 디렉터리 삭제
echo "Removing existing node_modules and build directories..." >> error_log.txt 2>&1
sudo rm -rf node_modules pnpm-lock.yaml .next >> error_log.txt 2>&1

# 특정 충돌 디렉토리 삭제 추가
echo "Removing problematic directory..." >> error_log.txt 2>&1
sudo rm -rf /home/ubuntu/deploy/node_modules/.pnpm/next@14.2.4_react-dom@18.3.1_react@18.3.1__react@18.3.1_sass@1.77.8/node_modules/next/experimental >> error_log.txt 2>&1

# 패키지 설치
echo "Installing packages..." >> error_log.txt 2>&1
pnpm install >> error_log.txt 2>&1

# 빌드 단계
echo "Building the project..." >> error_log.txt 2>&1
pnpm build --verbose | tee build_log.txt >> error_log.txt 2>&1

# 애플리케이션 시작 또는 재시작
echo "Starting or resurrecting the application..." >> error_log.txt 2>&1
sudo pm2 resurrect >> error_log.txt 2>&1 || sudo pm2 start npm --name "Frontend" -- start >> error_log.txt 2>&1

echo "Deployment finished successfully." >> error_log.txt 2>&1
