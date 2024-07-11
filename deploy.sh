REPOSITORY=/home/ubuntu/deploy

cd $REPOSITORY

sudo pnpm install

sudo pm2 reload all