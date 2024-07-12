REPOSITORY=/home/ubuntu/deploy

cd $REPOSITORY

sudo pnpm install

sudo pm2 resurrect

sudo pm2 start all
