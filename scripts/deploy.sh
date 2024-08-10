#!/bin/bash
set -e

LOG_FILE="/path/to/deploy.log"

# 권한 부여
echo "Changing ownership and permissions..." >> "$LOG_FILE" 2>&1
sudo chown -R ubuntu:ubuntu /home/ubuntu/deploy
sudo chmod -R 755 /home/ubuntu/deploy

# 작업 디렉토리로 이동
cd /home/ubuntu/deploy

# 패키지 설치
echo "Installing packages..." >> "$LOG_FILE" 2>&1
pnpm install --force
if [ $? -eq 0 ]; then
    echo "Packages installed successfully." >> "$LOG_FILE" 2>&1
else
    echo "Package installation failed." >> "$LOG_FILE" 2>&1
    exit 1
fi

# 애플리케이션 시작 또는 재시작
echo "Starting or resurrecting the application..." >> "$LOG_FILE" 2>&1
sudo pm2 resurrect || sudo pm2 start npm --name "Frontend" -- start

echo "Deployment finished successfully." >> "$LOG_FILE" 2>&1
