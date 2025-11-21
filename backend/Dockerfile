FROM php:8.2-fpm-alpine

WORKDIR /var/www

# Install PHP extensions if needed
RUN apk add --no-cache \
    && docker-php-ext-install pdo pdo_mysql

COPY . /var/www

RUN chown -R www-data:www-data /var/www

EXPOSE 9000

CMD ["php-fpm"]
