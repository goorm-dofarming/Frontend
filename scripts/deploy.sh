#!/bin/bash
set -e

LOG_FILE="/home/ubuntu/deploy/install.log"

# 권한 부여
echo "Changing ownership and permissions..."
sudo chown -R ubuntu:ubuntu /home/ubuntu/deploy
sudo chmod -R 755 /home/ubuntu/deploy

# 작업 디렉토리로 이동
cd /home/ubuntu/deploy

# 패키지 설치 함수 정의
install_packages() {
    echo "Installing packages..."
    pnpm install --force

    if [ $? -eq 0 ]; then
        echo "Packages installed successfully."
        return 0
    else
        echo "Package installation failed. Retrying..."
        pnpm install --force
        return $?
    fi
}

# 패키지 설치 시도
install_packages
if [ $? -ne 0 ]; then
    echo "Packages failed to install after retrying."
    exit 1
fi

# pnpm build
sudo pnpm build

# 모든 PM2 프로세스 중지
echo "Stopping all currently running PM2 processes..."
sudo pm2 stop all

# 애플리케이션 시작
echo "Starting the new application..."
pm2 start npm --name "Frontend" -- start

echo "Deployment finished successfully."


