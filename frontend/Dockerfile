FROM node:18-alpine as build

WORKDIR /frontend

COPY package.json package-lock.json ./

RUN ls

RUN cat package.json

RUN npm run build




COPY --from=build /frontend/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
