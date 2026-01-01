#!/bin/bash

# Production Deployment Script
# This script builds the frontend and starts the backend with PM2

set -e  # Exit on any error

echo "🚀 Starting deployment process..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if PM2 is installed
if ! command -v pm2 &> /dev/null; then
    echo "📦 PM2 not found. Installing PM2..."
    npm install -g pm2
fi

# Check if Python is installed
if ! command -v python3 &> /dev/null && ! command -v python &> /dev/null; then
    echo "⚠️  Warning: Python is not installed. AI recommendations will not work."
fi

# Check if .env file exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found. Copying from .env.production template..."
    cp .env.production .env
    echo "⚠️  Please update .env with your production credentials before continuing."
    echo "Press Enter to continue or Ctrl+C to cancel..."
    read
fi

# Step 1: Install root dependencies
echo "📦 Installing frontend dependencies..."
npm install

# Step 2: Build frontend
echo "🔨 Building frontend..."
npm run build

# Check if build was successful
if [ ! -d "build" ]; then
    echo "❌ Frontend build failed. Build directory not found."
    exit 1
fi

echo "✅ Frontend built successfully!"

# Step 3: Install backend dependencies
echo "📦 Installing backend dependencies..."
cd server
npm install
cd ..

# Step 4: Create logs directory if it doesn't exist
mkdir -p logs

# Step 5: Stop existing PM2 process if running
echo "🔄 Checking for existing PM2 processes..."
pm2 delete upbringing-app 2>/dev/null || true

# Step 6: Start with PM2
echo "🚀 Starting server with PM2..."
pm2 start ecosystem.config.js --env production

# Step 7: Save PM2 process list
echo "💾 Saving PM2 process list..."
pm2 save

# Step 8: Display status
echo ""
echo "✅ Deployment complete!"
echo ""
echo "📊 Application Status:"
pm2 status

echo ""
echo "📝 Useful commands:"
echo "  pm2 logs upbringing-app   - View logs"
echo "  pm2 restart upbringing-app - Restart application"
echo "  pm2 stop upbringing-app   - Stop application"
echo "  pm2 monit                 - Monitor resources"
echo ""
echo "🌐 Your application should be running on port 3001"
echo "Health check: http://localhost:3001/api/health"
echo ""
echo "🔒 Don't forget to:"
echo "  1. Set up Nginx reverse proxy"
echo "  2. Configure SSL with Let's Encrypt"
echo "  3. Set up firewall rules"
echo ""
