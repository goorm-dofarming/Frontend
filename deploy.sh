REPOSITORY=/home/ubuntu/deploy
# pm2의 전체 경로 설정
PM2_BIN="/home/ubuntu/.nvm/versions/node/v20.15.1/bin/pm2"
set -e

echo "Starting deploy script..."

cd $REPOSITORY

sudo pnpm install

sudo $PM2_BIN resurrect

sudo $PM2_BIN reload all

echo "Deploy script completed."
