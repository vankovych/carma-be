const Promise = require('bluebird');
const mongoose = Promise.promisifyAll(require("mongoose"));

const Schema = mongoose.Schema;

const DivisionSchema = new Schema({
  title: String,
  abbreviation: String,
  subdivisions: Array
});

module.exports = mongoose.model('Division', DivisionSchema);