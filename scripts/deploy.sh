#!/bin/bash
set -e  # 에러가 발생하면 스크립트 중단

REPOSITORY=/home/ubuntu/deploy

# 작업 디렉토리 이동
cd $REPOSITORY

# 권한 부여
echo "Changing ownership and permissions..." >> error_log.txt 2>&1
sudo chown -R ubuntu:ubuntu $REPOSITORY 2>> error_log.txt
sudo chmod -R 755 $REPOSITORY 2>> error_log.txt

# 캐시 정리
echo "Cleaning pnpm store..." >> error_log.txt 2>&1
pnpm store prune 2>> error_log.txt

# 기존 node_modules 및 관련 디렉터리 삭제
echo "Removing existing node_modules and build directories..." >> error_log.txt 2>&1
rm -rf node_modules pnpm-lock.yaml .next 2>> error_log.txt

# Install packages
echo "Installing packages..." >> error_log.txt 2>&1
pnpm install 2>> error_log.txt

# Build step
echo "Building the project..." >> error_log.txt 2>&1
pnpm build --verbose | tee build_log.txt 2>> error_log.txt

# Start or restart the application
echo "Starting or resurrecting the application..." >> error_log.txt 2>&1
sudo pm2 resurrect || pm2 start npm --name "Frontend" -- start 2>> error_log.txt

echo "Deployment finished successfully." >> error_log.txt 2>&1
