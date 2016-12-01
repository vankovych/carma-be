const mongoose = require('mongoose');
const logger = require('./logger').logger

exports.connect = connect;

function connect() {
  mongoose.connect('mongodb://localhost:27017/Carma');
  mongoose.connection.on('error', function (err)  {
    logger.error(err)
  })
}