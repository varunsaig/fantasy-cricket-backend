# Use an official Node.js runtime as the parent image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on (e.g., 3000)
EXPOSE 3000

# Command to run the app
CMD ["node", "index.js"]
