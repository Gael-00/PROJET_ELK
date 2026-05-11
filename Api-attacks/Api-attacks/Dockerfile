# Utilise une version légère de Node.js
FROM node:18-slim

# Définit le dossier de travail dans le conteneur
WORKDIR /app

# Copie les fichiers de dépendances pour installer les librairies
COPY package*.json ./

# Installe les dépendances (express, cors, elasticsearch...)
RUN npm install

# Copie tout le reste de ton code (server.js, etc.)
COPY . .

# Expose le port 4000 sur lequel ton API écoute
EXPOSE 4000

# Lance le serveur
CMD ["node", "server.js"]