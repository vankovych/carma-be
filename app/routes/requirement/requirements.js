const Requirement = require('../../models/requirement')
const mongoose = require('mongoose')

exports.create = create
exports.getAll = getAll
exports.get = get
exports.remove = remove
exports.update = update

function create (req, res, next) {
  const requirement = new Requirement()
  requirement._id = mongoose.Types.ObjectId()
  requirement.title = req.body.title
  requirement.description = req.body.description
  requirement.value = req.body.value

  requirement.save(err => {
    if (err) {
      res.send(err)
    } else {
      res.json({status: 'OK', data: requirement})
    }
  })
    .catch(next)
}

function getAll (req, res, next) {
  Requirement.findAsync()
    .then(requirement => {
      res.json({status: 'OK', data: requirement})
    })
    .catch(next)
}

function get (req, res, next) {
  Requirement.findByIdAsync(req.params.id)
    .then(requirement => {
      if (requirement) {
        res.json({status: 'OK', data: requirement})
      } else {
        res.status(404).end()
      }
    })
    .catch(next)
}

function remove (req, res, next) {
  Requirement.findByIdAsync(req.params.id)
    .then(requirement => {
      if (requirement !== null && requirement !== undefined) {
        return requirement
      } else {
        throw `Can't find requirements with id ${req.params.id}`
      }
    })
    .then(requirement => {
      Requirement.removeAsync({_id: req.params.id})
        .then(() => {
          res.status(200).json({status: 'OK', data: requirement})
        })
        .catch(err => {
          res.status(500).json({error: err})
        })
    })
    .catch(err => {
      res.status(404).json({error: err})
    })
}

function update (req, res, next) {
  Requirement.findByIdAsync(req.params.id)
    .then(requirement => {
      if (requirement !== null && requirement !== undefined) {
        return requirement
      } else {
        throw `Can't find requirements ith id ${req.params.id}`
      }
    })
    .then(requirement => {
      if (req.body === null || req.body === undefined) {
        throw `Can't find the body of request`
      }
      data = req.body
      requirement.title = ('title' in data) ? data.title : requirement.title
      requirement.description = ('description' in data) ? data.description : requirement.description
      requirement.value = ('value' in data) ? data.value : requirement.value
      return requirement
    })
    .then(requirement => {
      requirement.save(err => {
        if (err) {
          throw err
        }
      })
      res.status(200).json({status: 'OK', data: requirement})
    })
    .catch(err => {
      res.status(404).json({error: err})
    })
}
