FROM node:18-alpine as build

WORKDIR /frontend

COPY package.json package-lock.json 

RUN ls 

RUN npm install && ls 

RUN npm run build && ls

FROM nginx:alpine

COPY --from=build /frontend /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
