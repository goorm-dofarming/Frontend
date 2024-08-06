#!/bin/bash
set -e

REPOSITORY=/home/ubuntu/deploy

cd $REPOSITORY

# Remove existing node_modules directory if it exists
if [ -d "$REPOSITORY/node_modules" ]; then
  sudo rm -rf "$REPOSITORY/node_modules"
fi

# Install packages
sudo pnpm install

# Install packages
sudo pnpm build

# Start or restart the application
sudo pm2 start npm --name "Frontend" -- start