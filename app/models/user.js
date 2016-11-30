const Promise = require('bluebird')
const mongoose = Promise.promisifyAll(require('mongoose'))

const Schema = mongoose.Schema

const UserSchema = new Schema({
  _id: String,
  login: String,
  password: String,
  token: String
})

const User = mongoose.model('User', UserSchema)

module.exports = User

