# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Install express
RUN npm install express

# Install CORS
RUN npm install cors

# Copy the application code to the working directory
COPY . .

# Expose the port your app runs on
EXPOSE 8080

# Command to run your application
CMD ["node", "app.js"]
