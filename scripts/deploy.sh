#!/bin/bash
# set -e


# 권한 부여
echo "Changing ownership and permissions..."
sudo chown -R ubuntu:ubuntu /home/ubuntu/deploy
sudo chmod -R 755 /home/ubuntu/deploy

# 작업 디렉토리로 이동
cd /home/ubuntu/deploy

# 패키지 설치
echo "Installing packages..."
pnpm install

# 애플리케이션 시작 또는 재시작
echo "Starting or resurrecting the application..."
sudo pm2 resurrect || sudo pm2 start npm --name "Frontend" -- start

echo "Deployment finished successfully."
