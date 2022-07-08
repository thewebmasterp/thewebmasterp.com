# Base image
FROM nginx

# Set the directory for the app
WORKDIR /

# Copy all the files to the container
COPY public /usr/share/nginx/html

# Copy nginx configuration files
COPY nginx.conf /etc/nginx/nginx.conf
COPY nginx.conf.d /etc/nginx/conf.d

# Define the port number the container should expose
EXPOSE 80
