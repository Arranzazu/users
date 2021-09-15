const server = require('./server');
require('./database');

server.listen(server.get('port'), () => {
  console.log('Servidor listo en el puerto: ', server.get('port'));
})