#!/bin/bash
set -e

REPOSITORY=/home/ubuntu/deploy

cd $REPOSITORY

# Remove existing problematic file if it exists
if [ -f "$REPOSITORY/node_modules/.pnpm/eslint-config-next@14.2.4_eslint@8.57.0_typescript@5.5.3/node_modules/typescript/lib/zh-cn/diagnosticMessages.generated.json" ]; then
  rm -f "$REPOSITORY/node_modules/.pnpm/eslint-config-next@14.2.4_eslint@8.57.0_typescript@5.5.3/node_modules/typescript/lib/zh-cn/diagnosticMessages.generated.json"
fi

# Remove existing node_modules directory if it exists
if [ -d "$REPOSITORY/node_modules" ]; then
  sudo rm -rf "$REPOSITORY/node_modules"
fi

# Install packages
sudo pnpm install

# Start or restart the application
sudo pm2 start npm --name "dofarming" -- start -- -p 4000