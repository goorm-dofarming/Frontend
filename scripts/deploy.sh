#!/bin/bash
set -e

REPOSITORY=/home/ubuntu/deploy

cd $REPOSITORY

# 기존 node_modules 삭제
rm -rf node_modules pnpm-lock.yaml

# Install packages
pnpm install

# 권한 부여
sudo chown -R ubuntu:ubuntu /home/ubuntu/deploy/.next
sudo chmod -R 755 /home/ubuntu/deploy/.next

# build steps
pnpm build --verbose | tee build_log.txt

# Start or restart the application
sudo pm2 resurrect || sudo pm2 start npm --name "Frontend" -- start