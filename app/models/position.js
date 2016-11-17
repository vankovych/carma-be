const Promise = require('bluebird')
const mongoose = Promise.promisifyAll(require('mongoose'))

const Schema = mongoose.Schema

const PositionSchema = new Schema(
  {
    name: String,
    subTitle: String,
    parent_id: String,
    requirements: Array
  }
)

module.exports = mongoose.model('Position', PositionSchema)
