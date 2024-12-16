FROM node:18-alpine as build

WORKDIR /frontend

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build && ls -l /frontend

FROM nginx:alpine

COPY --from=build /frontend /usr/share/nginx/html

EXPOSE 90

CMD ["nginx", "-g", "daemon off;"]
