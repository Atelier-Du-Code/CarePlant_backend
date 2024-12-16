FROM node:18-alpine as build

WORKDIR /frontend/build

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN chmod -R 755 /frontend

RUN npm run build && ls -l /frontend

FROM nginx:alpine

COPY --from=build /frontend/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
