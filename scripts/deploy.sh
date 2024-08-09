#!/bin/bash
set -e

REPOSITORY=/home/ubuntu/deploy

cd $REPOSITORY

# Install packages
pnpm install

pnpm build

# Start or restart the application
sudo pm2 resurrect || sudo pm2 start npm --name "Frontend" -- start