REPOSITORY=/home/ubuntu/deploy

cd $REPOSITORY

sudo pnpm install
# pm2의 전체 경로 설정
PM2_BIN="/home/ubuntu/.nvm/versions/node/v20.15.1/bin/pm2"
sudo $PM2_BIN resurrect

sudo $PM2_BIN reload all
