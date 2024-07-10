REPOSITORY=/home/ubuntu/deploy

cd $REPOSITORY

sudo npm install

sudo pm2 resurrect

sudo pm2 reload all