// Programme pour écouter une requète HTTP et y répondre : 
const http = require('http'); // Pour importer le package http de Node et l'utiliser pour créer un serveur
const app = require('./app'); // importation de app.js

const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;                        // Cela renvoit un port valide qu'il soit sous forme de chaine ou numéro
  }
  return false;
};

const port = normalizePort(process.env.PORT || '3000'); //Port par défaut si le port 3000 n'est pas disponible
app.set('port', port); //Pour dire à l'application sur quel port elle va tourner

const errorHandler = error => {
  if (error.syscall !== 'listen') {           // Recherche les différentes erreurs et les gères de manière appropriée
    throw error;                              // + un écouteur pour consigner le port ou le canal nommé sur lequel le serveur s'éxécute dans la console
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

const server = http.createServer(app); // création du server de http

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

server.listen(port);
