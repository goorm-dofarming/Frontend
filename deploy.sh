REPOSITORY=/home/ubuntu/deploy

cd $REPOSITORY

# Remove existing problematic file if it exists
rm -f /home/ubuntu/deploy/node_modules/.pnpm/eslint-config-next@14.2.4_eslint@8.57.0_typescript@5.5.3/node_modules/typescript/lib/zh-cn/diagnosticMessages.generated.json

sudo pnpm install

sudo pm2 resurrect

sudo pm2 start all
