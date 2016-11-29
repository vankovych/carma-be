const Position = require('./../../models/position')
const Requirement = require('./../../models/requirement')

exports.getAll = getAll
exports.add = add
exports.remove = remove

function getAll (req, res, next) {
  Position.findByIdAsync(req.params.p_id)
    .then(position => {
      if (position) {
        res.status(200).json({status: 'OK', data: position.requirements})
      } else {
        res.status(404).json({error: `Can't find position with id ${req.params.p_id}`})
      }
    })
}

function add (req, res, next) {
  Position.findByIdAsync(req.params.p_id)
    .then(position => {
      if (position) {
        return position
      } else {
        res.status(400).json({error: `Can't find position with id ${req.params.p_id}`})
      }
    })
    .then(position => {
      Requirement.findByIdAsync(req.params.r_id)
        .then(requirement => {
          if (requirement) {
            if (position.requirements.indexOf(req.params.r_id) === -1) {
              position.requirements.push(requirement._id)
              position.save(err => {
                if (err) {
                  res.status(500).json({error: err})
                } else {
                  res.status(200).json({status: 'OK', data: position, insert: true})
                }
              })
            } else {
              res.status(200).json({status: 'OK', data: position, insert: false})
            }
          } else {
            res.status(404).json({error: `Can't find requirement with id ${req.params.r_id}`})
          }
        })
    })
}

function remove (req, res, next) {
  Position.findByIdAsync(req.params.p_id)
    .then(position => {
      if (position) {
        if (position.requirements.indexOf(req.params.r_id) !== -1){
        position.requirements.splice(position.requirements.indexOf(req.params.r_id), 1)
        position.save(err => {
          if (err) {
            res.status(500).json({error: err})
          } else {
            res.status(200).json({status: 'OK', data: position})
          }
        })
        } else {
          res.status(200).json({status: 'OK', data: position})
        }
      } else {
        res.status(404).json({error: `Can't find subdivision with id ${req.params.p_id}`})
      }
    })
}