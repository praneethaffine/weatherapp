# Stage 1: Build the Vite app
FROM node:18 AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Set the environment (change 'prod' to 'qa' or 'development' as needed)
ARG ENVIRONMENT=prod
ENV NODE_ENV=$ENVIRONMENT

# Use env-cmd to load the specified environment from .env-cmdrc and build
RUN npm run build:$ENVIRONMENT

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy the build output from the first stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy a custom Nginx configuration file
COPY ./nginx /etc/nginx/conf.d

# Expose the port Nginx will serve on
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]