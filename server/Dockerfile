# Use the official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Install required dependencies for building native modules
RUN apk add --no-cache libc6-compat openssl

# Copy package.json and yarn.lock to the container
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Expose the port the server will run on
EXPOSE 3000

# Start the server
CMD ["yarn", "start"]
