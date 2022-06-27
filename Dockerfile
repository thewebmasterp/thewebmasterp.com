# Base image
FROM nginx

# Set the directory for the app
WORKDIR /

# Copy all the files to the container
COPY public /usr/share/nginx/html

# Define the port number the container should expose
EXPOSE 80
