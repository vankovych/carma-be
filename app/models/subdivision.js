const Promise = require('bluebird')
const mongoose = Promise.promisifyAll(require('mongoose'))

const Schema = mongoose.Schema

const SubdivisionSchema = new Schema({
  _id: String,
  name: String,
  subTitle: String,
  parent_id: String,
  subnodes: Array
})

module.exports = mongoose.model('Subdivision', SubdivisionSchema)
