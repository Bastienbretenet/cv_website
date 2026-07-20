FROM nginx:alpine
COPY index.html style.css script.js /usr/share/nginx/html/
COPY files/ /usr/share/nginx/html/files/
EXPOSE 80
