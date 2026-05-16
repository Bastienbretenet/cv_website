FROM nginx:alpine
COPY index.html style.css script.js cv-photo.png /usr/share/nginx/html/
EXPOSE 80
