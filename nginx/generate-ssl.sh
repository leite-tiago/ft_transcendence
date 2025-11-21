#!/bin/sh

# Generate self-signed SSL certificate if it doesn't exist
if [ ! -f /etc/nginx/ssl/cert.pem ] || [ ! -f /etc/nginx/ssl/key.pem ]; then
    echo "Generating self-signed SSL certificate..."
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
        -keyout /etc/nginx/ssl/key.pem \
        -out /etc/nginx/ssl/cert.pem \
        -subj "/C=PT/ST=Lisbon/L=Lisbon/O=42/OU=ft_transcendence/CN=localhost"
    echo "SSL certificate generated successfully!"
else
    echo "SSL certificate already exists."
fi
