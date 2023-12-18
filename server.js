// importation du package http de node
const http = require('http');

// Création du serveur argument req = requete et res = réponse
const server = http.createServer((req, res) => {
  res.end('Voilà la réponse duserveur !');
});

// Si lenvironnement du serveur est défini, on utilise le port défini, sinon on utilise le port 3000
server.listen(process.env.PORT || 3000);