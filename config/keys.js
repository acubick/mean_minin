module.exports = {
  mongoURI: 'mongodb+srv://acubickUser:105129LA@cluster0.sgcyh.mongodb.net/expressTest?retryWrites=true&w=majority',
  jwt: 'dev-jwt'
}


// module.exports = {
//   mongoURI: 'mongodb+srv://acubick:12345@cluster0.ejjdz.mongodb.net/test?retryWrites=true&w=majority'
// }

// var mongoose = require('mongoose')
//
//const dbURI = 'mongodb+srv://cluster0.sgcyh.mongodb.net/expressTest?retryWrites=true&w=majority';
// const dbOptions =  {
//   user: 'acubickUser',
//   pass: '105129LA',
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }
// mongoose.connect(dbURI, dbOptions )
//
// mongoose.connection.on('connected', function () {
//   console.info('Mongoose connected to :'+ dbURI );
// });
//
// mongoose.connection.on('error', function () {
//   console.info('Mongoose connection error:'+ dbURI );
// });
//
// module.exports = mongoose;
