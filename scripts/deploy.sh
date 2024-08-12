#!/bin/bash
set -e

LOG_FILE="/home/ubuntu/deploy/install.log"

# 권한 부여
echo "Changing ownership and permissions..." | tee -a $LOG_FILE
sudo chown -R ubuntu:ubuntu /home/ubuntu/deploy
sudo chmod -R 755 /home/ubuntu/deploy

# 작업 디렉토리로 이동
cd /home/ubuntu/deploy

# 패키지 설치 함수 정의
install_packages() {
    echo "Installing packages..." | tee -a $LOG_FILE
    pnpm install --force | tee -a $LOG_FILE

    if [ $? -eq 0 ]; then
        echo "Packages installed successfully." | tee -a $LOG_FILE
        return 0
    else
        echo "Package installation failed. Retrying..." | tee -a $LOG_FILE
        pnpm install --force | tee -a $LOG_FILE
        return $?
    fi
}

# 패키지 설치 시도
install_packages
if [ $? -ne 0 ]; then
    echo "Packages failed to install after retrying." | tee -a $LOG_FILE
    exit 1
fi

# node_modules 권한 부여
echo "Changing ownership of node_modules to ubuntu..." | tee -a $LOG_FILE
sudo chown -R ubuntu:ubuntu /home/ubuntu/deploy
sudo chmod -R 755 /home/ubuntu/deploy

# pnpm 재설치
sudo pnpm install

# pnpm build
sudo pnpm build

# 배포 중단
sudo pm2 kill

# 애플리케이션 시작 또는 재시작
echo "Starting or resurrecting the application..." | tee -a $LOG_FILE
pm2 resurrect || pm2 start npm --name "Frontend" -- start | tee -a $LOG_FILE

echo "Deployment finished successfully." | tee -a $LOG_FILE