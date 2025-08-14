# Use Node LTS official image
FROM node:18-alpine

# Set working directory inside container
WORKDIR /usr/src/app

# Copy package files and install dependencies first (for caching)
COPY package*.json ./
RUN npm install --production

# Copy all app source
COPY . .

# Expose port your backend listens on
EXPOSE 5000

# Start the backend server
CMD ["node", "server.js"]
