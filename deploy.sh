REPOSITORY=/home/ubuntu/deploy

cd $REPOSITORY

sudo npm install -g pnpm

sudo pnpm install

sudo pm2 resurrect

sudo pm2 reload all