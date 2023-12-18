// importation du package http de node
const http = require('http');

// Importation de l'application express
const app = require('./app');

// on définit le port de l'application
app.set('port', process.env.PORT || 3000);

// Création du serveur argument req = requete et res = réponse
// const server = http.createServer((req, res) => {
//   res.end('Voilà la réponse duserveur !');
// });

// On remplace la fonction par l'application express
const server = http.createServer(app);

// Si lenvironnement du serveur est défini, on utilise le port défini, sinon on utilise le port 3000
server.listen(process.env.PORT || 3000);