# Étape unique : on utilise Nginx pour servir des fichiers statiques
FROM nginx:alpine

# Supprimer les fichiers par défaut de Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copier tout ton code statique dans le répertoire public de Nginx
COPY . /usr/share/nginx/html

# Exposer le port 80 pour que Nginx réponde aux requêtes
EXPOSE 80

# Pas besoin de spécifier ENTRYPOINT, c’est déjà "nginx -g daemon off;" par défaut
