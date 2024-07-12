#!/bin/bash

REPOSITORY=/home/ubuntu/deploy

cd $REPOSITORY

# Remove existing problematic file if it exists
rm -f /home/ubuntu/deploy/node_modules/.pnpm/eslint-config-next@14.2.4_eslint@8.57.0_typescript@5.5.3/node_modules/typescript/lib/zh-cn/diagnosticMessages.generated.json

sudo pnpm install

# Start or restart the application
sudo pm2 start npm --name "dofarming" -- start -- -p 4000
