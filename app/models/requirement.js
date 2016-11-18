const Promise = require('bluebird')
const mongoose = Promise.promisifyAll(require('mongoose'))

const Schema = mongoose.Schema

const RequirementSchema = new Schema({
    _id: String,
    title: String,
    description: String,
    value: String
})

module.exports = mongoose.model('Requirement', RequirementSchema)