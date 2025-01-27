FROM node:18-alpine

# Définir le répertoire de travail
WORKDIR /backend

COPY . .

RUN npm install


RUN npm run build


EXPOSE 10000

CMD ["npm", "start"]
