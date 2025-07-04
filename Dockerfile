# Use Node.js base image
FROM node:18-slim

# Install system dependencies needed by Puppeteer
RUN apt-get update && apt-get install -y \
    wget \
    ca-certificates \
    fonts-liberation \
    libappindicator3-1 \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libcups2 \
    libdbus-1-3 \
    libgdk-pixbuf2.0-0 \
    libnspr4 \
    libnss3 \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    xdg-utils \
    --no-install-recommends && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy your code into the container
COPY . .

# Install dependencies (including puppeteer)
RUN npm install

# Build the TypeScript code
RUN npm run build

# Expose the port (change this if your app uses another)
EXPOSE 8080

# Start your backend
CMD ["node", "dist/server.js"]
