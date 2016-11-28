const Promise = require('bluebird')
const mongoose = Promise.promisifyAll(require('mongoose'))

const Schema = mongoose.Schema

const UserSchema = new Schema({
  _id: String,
  login: String,
  password: String,
})

module.exports = mongoose.model('User', UserSchema)
