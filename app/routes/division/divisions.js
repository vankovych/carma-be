const Division = require('./../../models/division')
const mongoose = require('mongoose')
const logger = require('./../../libs/logger')

exports.create = create
exports.getAll = getAll
exports.get = get
exports.remove = remove
exports.update = update
exports.subdivisions = require('./subdivisions.js')

function create (req, res, next) {
  const division = new Division()
  division.title = req.body.title
  division.subtitle = req.body.subTitle
  division.subdivision = []
  division._id = mongoose.Types.ObjectId()

  division.save(err => {
    if (err) {
      logger.error(err)
      res.send(err)
    }
    res.json({ status: 'OK`', data: division })
  })
}

function getAll (req, res, next) {
  Division.findAsync()
    .then(divisions => {
      res.json({ status: 'OK', data: divisions })
    })
    .catch(err => {
      logger.error(err)
      res.status(500).json({error: err})
    })
}

function get (req, res, next) {
  Division.findByIdAsync(req.params.id)
    .then(division => {
      if (division) {
        res.json({ status: 'OK', data: division })
      } else {
        res.status(404).json({error: `Can't find division with id ${req.params.id}`})
      }
    })
    .catch(err => {
      logger.error(err)
      res.status(500).json({error: err})
    })
}

function remove (req, res, next) {
  Division.removeAsync({ _id: req.params.id })
    .then(() => {
      res.json({ status: 'OK' })
    })
    .catch(err => {
      logger.error(err)
      throw err
    })
    .catch(err => {
      logger.error(err)
      res.status(500).json({error: err})
    })
}

function update (req, res, next) {
  Division.findByIdAsync(req.params.id)
    .then(division => {
      division.title = req.body.title
      division.subTitle = req.body.subTitle

      division.save(err => {
        if (err) {
          logger.error(err)
          res.send(err)
        }

        res.json({ status: 'OK' })
      })
    })
    .catch(err => {
      logger.error(err)
      res.status(500).json({error: err})
    })
}
