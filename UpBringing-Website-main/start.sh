#!/bin/bash
# Start script for Render deployment

echo "🚀 Starting AI Recommendations Service with Python FastAPI"

# Check Python version
echo "🐍 Python version:"
python3 --version

# Check if requirements are installed
echo "📦 Checking Python packages..."
pip3 list | grep -E "pandas|scikit-learn|fastapi|uvicorn" || echo "⚠️ Some packages may be missing"

# Start Python FastAPI server in background on port 8000
echo "📊 Starting Python server on port 8000..."
python3 python_server.py > python_server.log 2>&1 &
PYTHON_PID=$!

echo "🔍 Python server PID: $PYTHON_PID"

# Show initial Python logs
sleep 2
echo "📋 Python server initial output:"
cat python_server.log || echo "No log file yet"

# Wait for Python server to be ready
echo "⏳ Waiting for Python server to start..."
sleep 8

# Check if Python server is running
if ! kill -0 $PYTHON_PID 2>/dev/null; then
    echo "❌ Python server failed to start"
    exit 1
fi

# Verify Python server is responding
echo "🔍 Checking if Python server is responding..."
for i in {1..5}; do
    if curl -f http://localhost:8000/api/health > /dev/null 2>&1; then
        echo "✅ Python server is ready"
        break
    fi
    if [ $i -eq 5 ]; then
        echo "❌ Python server not responding after 5 attempts"
        echo "📋 Last 50 lines of Python server log:"
        tail -n 50 python_server.log || echo "No log file available"
        echo "🔍 Checking if Python process is still running:"
        ps aux | grep python3 || echo "No Python processes found"
        exit 1
    fi
    echo "⏳ Waiting for Python server to respond... ($i/5)"
    sleep 2
done

# Start Node.js proxy server on PORT (Render's port)
echo "🌐 Starting Node.js proxy on port ${PORT:-10000}..."
export PYTHON_SERVER_URL=http://localhost:8000
cd workers && node ai-service.js &
NODE_PID=$!

echo "✅ Both servers started successfully"
echo "📡 Python on port 8000, Node.js on port ${PORT:-10000}"

# Function to handle shutdown
cleanup() {
    echo "🛑 Shutting down servers..."
    kill $PYTHON_PID $NODE_PID 2>/dev/null
    exit 0
}

trap cleanup SIGTERM SIGINT

# Wait for both processes
wait $PYTHON_PID $NODE_PID
