// importation du package http de node
const http = require('http');

// Importation de l'application express
const app = require('./app');

// fonction qui renvoie un port valide, qu'il soit fourni sous la forme d'un numéro ou d'une chaîne
const normalizePort = val => {
  const port = parseInt(val, 10);

  // Si le port est un nombre, on le retourne
  if (isNaN(port)) {
    return val;
  }

  // Si le port est supérieur à 0, on le retourne
  if (port >= 0) {
    return port;
  }

  return false;
};

// on définit le port de l'application
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

// fonction qui recherche les différentes erreurs et les gère de manière appropriée. Elle est ensuite enregistrée dans le serveur
const errorHandler = error => {
    if (error.syscall !== 'listen') {
      throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges.');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use.');
        process.exit(1);
        break;
      default:
        throw error;
    }
};

// Création du serveur argument req = requete et res = réponse
// const server = http.createServer((req, res) => {
//   res.end('Voilà la réponse duserveur !');
// });

// On remplace la fonction par l'application express
const server = http.createServer(app);

// Gestion des erreurs du serveur, execute la fonction errorHandler lorsque le serveur émet une erreur
server.on('error', errorHandler);

// Ecouteur d'évènements consignant le port ou le canal nommé sur lequel le serveur s'exécute dans la console
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

// Si lenvironnement du serveur est défini, on utilise le port défini, sinon on utilise le port 3000
server.listen(process.env.PORT || 3000);