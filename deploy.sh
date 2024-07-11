REPOSITORY=/home/ubuntu/deploy

cd $REPOSITORY

sudo pnpm install
# pm2의 전체 경로 설정
PM2_BIN="/home/ubuntu/.nvm/versions/node/v20.15.1/bin/pm2"

sudo $PM2_BIN reload all
# # pm2가 실행 가능한지 확인
# if [ -x "$PM2_BIN" ]; then
#     # pm2를 사용하여 애플리케이션 시작
#     sudo $PM2_BIN start pnpm -w Frontend -- start
# else
#     echo "pm2를 찾거나 실행할 수 없습니다: $PM2_BIN"
#     exit 1
# fi

