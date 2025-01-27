FROM node:18-alpine

# Définir le répertoire de travail
WORKDIR /backend

COPY /backend/ ./

RUN ls -al /backend


RUN npm install

RUN chmod +x node_modules/.bin/tsc

RUN npm run build


EXPOSE 10000

CMD ["npm", "start"]
