# Stage 1: Build the application
FROM node:18 AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Build the application
RUN yarn build

# Stage 2: Nginx
FROM nginx:alpine

# Copy the built application
COPY --from=build /app/dist /usr/share/nginx/html

# Copy the Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the port Nginx is to run on
EXPOSE 3001

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
