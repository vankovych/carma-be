const Subdivision = require('./../../models/subdivision')
const Position = require('./../../models/position')
const mongoose = require('mongoose')

exports.create = create
exports.getAll = getAll
exports.remove = remove
exports.get = get
exports.update = update

function create (req, res, next) {
  const position = new Position()

  position.name = req.body.name
  position.subTitle = req.body.subTitle
  position._id = mongoose.Types.ObjectId()

  position.save((err) => {
    if (err) {
      res.status(500).json({error: err})
    } else {
      res.status(200).json({status: "OK", data: position})
    }
  })
}

function getAll (req, res, next) {
  Position.findAsync()
    .then((position) => {
      res.status(200).json({status: 'OK', data: position})
    })
    .catch(next)
}

function remove (req, res, next) {
  Position.findByIdAsync(req.params.id)
    .then((position) => {
      if (position === undefined || position === null) {
        res.status(404).json({data: `Can't find position with id ${req.params.id}`})
      } else {
        position.remove(err => {
          if (err) {
            res.send(err)
          } else {
            res.status(200).json({status: "OK", data: position})
          }
        })
      }
    })
    .catch(next)
}

function get (req, res, next) {
  Position.findByIdAsync(req.params.id)
    .then((position) => {
      res.status(200).json({status: 'OK', data: position})
    })
}

function update (req, res, next) {
  if (req.params.id === undefined) {
    res.status(404).json({error: 'You should send id of position like url parameter.'})
    return
  }
  Position.findByIdAsync(req.params.id)
    .then((position) => {
      if (position === undefined || position === null) {
        res.status(404).json({err: `Can't find position with id ${req.params.id}`})
      } else {
         position.name = ('name' in req.body) ? req.body.name : position.name
          position.subTitle = ('subTitle' in req.body) ? req.body.subTitle : position.subTitle

          position.save((err) => {
            if (err) {
              res.status(500).send(err)
            } else {
              res.status(200).json({status: 'OK', data: position})
            }
          })
      }
    })
}
