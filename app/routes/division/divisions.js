const Division = require('./../../models/division')
const mongoose = require('mongoose')

exports.create = create
exports.getAll = getAll
exports.get = get
exports.remove = remove
exports.update = update

function create (req, res, next) {
  const division = new Division()
  division.title = req.body.title
  division.subtitle = req.body.subTitle
  division.subdivision = []
  division._id = mongoose.Types.ObjectId()

  division.save(err => {
    if (err) {
      res.send(err)
    }
    res.json({ status: 'OK`', data: division })
  })
    .catch(next)
}

function getAll (req, res, next) {
  Division.findAsync()
    .then(divisions => {
      res.json({ status: 'OK', data: divisions })
    })
    .catch(next)
}

function get (req, res, next) {
  Division.findByIdAsync(req.params.id)
    .then(division => {
      if (division) {
        res.json({ status: 'OK', data: division })
      } else {
        res.status(404).end()
      }
    })
    .catch(next)
}

function remove (req, res, next) {
  Division.removeAsync({ _id: req.params.id })
    .then(() => {
      res.json({ status: 'OK' })
    })
    .catch(next)
}

function update (req, res, next) {
  Division.findByIdAsync(req.params.id)
    .then(division => {
      division.title = req.body.title
      division.subTitle = req.body.subTitle

      division.save(err => {
        if (err) {
          res.send(err)
        }

        res.json({ status: 'OK' })
      })
    })
    .catch(next)
}
