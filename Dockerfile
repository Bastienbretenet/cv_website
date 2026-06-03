FROM nginx:alpine
COPY index.html style.css script.js photo-1.png photo-2.jpg /usr/share/nginx/html/
EXPOSE 80
