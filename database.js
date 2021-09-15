const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/store')
.then(() => {
  console.log('DB Connected.');
})
.catch((e) => {
  console.log(e);
})