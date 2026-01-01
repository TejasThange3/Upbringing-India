# Use official Python image with Node.js
FROM python:3.11-slim

# Install Node.js 20.x (required by react-router-dom)
RUN apt-get update && apt-get install -y \
    curl \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy requirements first (for better caching)
COPY requirements.txt ./

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy all package.json files
COPY package*.json ./
COPY workers/package*.json ./workers/

# Install Node.js dependencies (both root and workers/)
RUN npm install
RUN cd workers && npm install && cd ..

# Copy application files
COPY . .

# Make start script executable
RUN chmod +x start.sh

# Expose port for Render
EXPOSE 10000

# Start both servers
CMD ["./start.sh"]
