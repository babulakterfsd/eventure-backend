# Use a lightweight Node.js image
FROM node:18-slim

# Install required system dependencies for Puppeteer + Chromium
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
    libgbm1 \                    # ✅ This fixes your error
    xdg-utils \
    --no-install-recommends && rm -rf /var/lib/apt/lists/*

# Set the working directory
WORKDIR /app

# Copy your app files
COPY . .

# Install app dependencies
RUN npm install

# Build TypeScript to JavaScript
RUN npm run build

# Expose port (adjust if your app uses a different port)
EXPOSE 8080

# Start the server
CMD ["node", "dist/server.js"]
