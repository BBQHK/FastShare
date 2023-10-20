# Use an official Node.js runtime as a parent image
FROM node:20.7

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# set npm proxy
# if you are behind a proxy, uncomment the following lines
RUN npm config set proxy http://10.108.42.94:3128
RUN npm config set https-proxy http://10.108.42.94:3128

# Install Quasar
RUN npm install -g @quasar/cli

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose port 8080 for the container
EXPOSE 8080

# Start the server
CMD ["quasar", "dev"]


# docker build -t fastshare-front .
# docker run -p 8080:8080 --mount type=bind,source=/home/g21778/Documents/GitHub/FastShare/front-end/FastShare,target=/app --name fsf fastshare-front