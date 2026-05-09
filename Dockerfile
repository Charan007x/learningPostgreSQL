FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker layer caching
COPY package*.json ./

# Install only production dependencies
RUN npm ci --omit=dev

# Copy the rest of your application code into the container
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Start the server using node directly
CMD ["node", "src/server.js"]