const mongoose = require('mongoose');

exports.connect = connect;

function connect() {
  mongoose.connect('mongodb://localhost:27017/Carma');
}