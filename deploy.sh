REPOSITORY=/home/ubuntu/deploy
# pm2의 전체 경로 설정
PM2_BIN="/home/ubuntu/.nvm/versions/node/v20.15.1/bin/pm2"

cd $REPOSITORY

sudo pnpm install

sudo pm2 resurrect

sudo pm2 reload all

echo "Deploy script completed."
