FROM node:18-alpine

# Définir le répertoire de travail
WORKDIR /backend

# Copier uniquement les fichiers nécessaires pour installer les dépendances
COPY package.json package-lock.json ./

# Installer les dépendances
RUN npm install

# Vérification : afficher le contenu de node_modules/.bin
RUN ls -l node_modules/.bin/

# Copier le reste du code source
COPY . .

# Build du projet (assure-toi que TypeScript est bien installé)
RUN npm run build

# Exposer le port pour l'application
EXPOSE 10000

# Démarrer le serveur
CMD ["npm", "start"]
