FROM node:9
COPY . .
RUN npm install
RUN npm run ionic:build -- --prod

FROM nginx 
COPY --from=0 www /usr/share/nginx/html
EXPOSE 80