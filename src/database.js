const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/usersej')//userej nombre de la bbdd
.then(() => {
  console.log('Base de Datos Connectada.');
})
.catch((e) => {
  console.log(e);
})
