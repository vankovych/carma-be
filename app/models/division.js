const Promise = require('bluebird')
const mongoose = Promise.promisifyAll(require('mongoose'))

const Schema = mongoose.Schema

const DivisionSchema = new Schema({
  _id: String,
  title: String,
  subTitle: String,
  subdivisions: Array
})

module.exports = mongoose.model('Division', DivisionSchema)
