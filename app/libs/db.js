const mongoose = require('mongoose');

exports.connect = connect;

function connect() {
  mongoose.connect('mongodb://admin:admin@ds033966.mlab.com:33966/carma');
}