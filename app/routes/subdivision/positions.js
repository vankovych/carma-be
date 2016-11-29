const Subdivision = require('./../../models/subdivision')
const Position = require('./../../models/position')

exports.getAll = getAll
exports.add = add
exports.remove = remove

function getAll (req, res, next) {
  Subdivision.findByIdAsync(req.params.s_id)
    .then(subdivision => {
      if (subdivision) {
        res.status(200).json({status: 'OK', data: subdivision.subnodes})
      } else {
        res.status(404).json({error: `Can't find subdivision with id ${req.params.s_id}`})
      }
    })
}

function add (req, res, next) {
  Subdivision.findByIdAsync(req.params.s_id)
    .then(subdivision => {
      if (subdivision) {
        return subdivision
      } else {
        res.status(404).json({error: `Can't find subdivision with id ${req.params.s_id}`})
      }
    })
    .then(subdivision => {
      Position.findByIdAsync(req.params.p_id)
        .then(position => {
          if (position) {
            if (subdivision.subnodes.indexOf(position._id) === -1) {
              subdivision.subnodes.push(position._id)
              subdivision.save(err => {
                if (err) {
                  res.status(500).json({error: err})
                } else {
                  res.status(200).json({status: 'OK', data: subdivision, insert: true})
                }
              })} else {
                res.status(200).json({status: 'OK', data: subdivision, insert: false})
              }
          } else {
            res.status(404).json({error: `Can't find position with id ${req.params.p_id}`})
          }
        })
    })
}

function remove (req, res, next) {
  Subdivision.findByIdAsync(req.params.s_id)
    .then(subdivision => {
      if (subdivision) {
        if (subdivision.subnodes.indexOf(req.params.p_id) !== -1){
        subdivision.subnodes.splice(subdivision.subnodes.indexOf(req.params.p_id), 1)
        subdivision.save(err => {
          if (err) {
            res.status(500).json({error: err})
          } else {
            res.status(200).json({status: 'OK', data: subdivision})
          }
        })
        } else {
          res.status(200).json({status: 'OK', data: subdivision})
        }
      } else {
        res.status(404).json({error: `Can't find subdivision with id ${req.params.s_id}`})
      }
    })
}
