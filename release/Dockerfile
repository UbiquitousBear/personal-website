FROM nginx:alpine
COPY /release/nginx.conf /etc/nginx/conf.d/default.conf
COPY /build /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]