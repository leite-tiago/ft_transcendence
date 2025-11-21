FROM nginx:alpine

# Install openssl for generating self-signed certificates
RUN apk add --no-cache openssl

# Create SSL directory
RUN mkdir -p /etc/nginx/ssl

COPY conf/default.conf /etc/nginx/conf.d/default.conf
COPY generate-ssl.sh /docker-entrypoint.d/40-generate-ssl.sh
RUN chmod +x /docker-entrypoint.d/40-generate-ssl.sh

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]
