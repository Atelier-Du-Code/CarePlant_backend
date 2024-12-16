FROM node:18-alpine as build

WORKDIR /frontend

COPY package.json package-lock.json ./

RUN npm install

WORKDIR /frontend/build

RUN npm run build && ls -l /frontend/build

FROM nginx:alpine

COPY --from=build /frontend/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
