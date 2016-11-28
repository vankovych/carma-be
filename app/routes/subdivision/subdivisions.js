const Subdivision = require('../../models/subdivision')
const mongoose = require('mongoose')

exports.create = create
exports.getAll = getAll
exports.get = get
exports.remove = remove
exports.update = update

function create (req, res, next) {
  const subdivision = new Subdivision()
    subdivision.name = req.body.name
    subdivision.subTitle = req.body.subTitle
    subdivision._id = mongoose.Types.ObjectId()
    subdivision.subnodes = []

    subdivision.save(err => {
      if (err) {
        res.send(err)
      }
    })

    res.status(200).json({status: "OK", data: subdivision})
}

function getAll (req, res, next) {
  Subdivision.findAsync()
    .then(subdivision => {
      res.json({ status: 'OK', data: subdivision })
    })
    .catch(next)
}

function get (req, res, next) {
  Subdivision.findByIdAsync(req.params.id)
    .then(subdivision => {
      if (subdivision) {
        res.json({ status: 'OK', data: subdivision })
      } else {
        res.status(404).end()
      }
    })
    .catch(next)
}

function remove (req, res, next) {
  Subdivision.findByIdAsync(req.params.id)
    .then(subdivision => {
      if (subdivisions === null || subdivision === undefined) {
        throw `Can't find subdivision with id ${req.params.id}`
      } else {
        return subdivision
      }
    })
    .then(subdivision => {
      Subdivision.removeAsync({_id: req.params.id})
      res.status(200).json({status: "OK", data: subdivision})
    })
    .catch(err => {
      res.status(404).json({error: err})
    })
}

function update (req, res, next) {
  Subdivision.findByIdAsync(req.params.id)
    .then(subdivision => {
      if (subdivision === null || subdivision === undefined) {
        throw `Can't find subdivision with id ${req.params.id}`
      } else {
        return subdivision
      }
    })
    .then(subdivision => {
      if (req.body === null || req.body === undefined) {
        throw `Can't find the body of request`
      }
      data = req.body
      subdivision.name = ('name' in data) ? data.name : subdivision.name
      subdivision.subTitle = ('subTitle' in data) ? data.subTitle : subdivision.subTitle
      return subdivision
    })
    .then(subdivision => {
      subdivision.save(err => {
        if (err) {
          throw err
        }
      })
      res.status(200).json({status: "OK", data: subdivision})
    })
    .catch(err =>
    {
      res.status(404).json({error: err})
    })
}
