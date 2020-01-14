FROM dockerproxy.fuib.com/nginx:1.12.2

COPY nginx.vh.default.conf /etc/nginx/conf.d/default.conf

COPY dist/ /usr/share/nginx/html
