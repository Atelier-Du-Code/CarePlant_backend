FROM node:18-alpine

# Définir le répertoire de travail
WORKDIR /backend

COPY . .

# Installer les dépendances
RUN npm install

RUN ls -l node_modules/.bin/tsc


# Vérification : afficher le contenu de node_modules/.bin
RUN ls -l node_modules/.bin/


# Build du projet (assure-toi que TypeScript est bien installé)
RUN npm run build

# Exposer le port pour l'application
EXPOSE 10000

# Démarrer le serveur
CMD ["npm", "start"]
