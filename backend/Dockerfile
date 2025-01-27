FROM node:18-alpine

WORKDIR /backend

COPY package.json package-lock.json ./

RUN npm install

COPY . .

# RUN chmod +x node_modules/.bin/tsc

RUN npm run build

EXPOSE 10000

CMD ["npm", "start"]
