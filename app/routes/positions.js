const Subdivision = require('../models/subdivision')
const Position = require('../models/position')
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
  position.parent_id = req.body.parent_id
  position._id = mongoose.Types.ObjectId()

  Subdivision.findByIdAsync(req.body.parent_id)
    .then(subdivision => {
      if (subdivision !== null && subdivision !== undefined) {
        subdivision.subnodes.push(position._id)
        subdivision.save((err) => {
          if (err) {
            throw err
          }
          position.save((err) => {
            if (err) {
              throw err
            }
          })
          res.status(200).json({status: 'OK', data: position})
        })
      } else {
        res.status(404).json({data: 'Can`t find subdivision with id ' + position.parent_id})
      }
    })
    .catch(next)
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
        Subdivision.findByIdAsync(position.parent_id)
          .then((subdivision) => {
            // if parent subdivision is undevfined we willn`t update it
            if (subdivision !== undefined && subdivision !== null) {
              subdivision.subnodes.splice(subdivision.subnodes.indexOf(position._id), 1)
              subdivision.save()
            }
            Position.removeAsync({_id: req.params.id})
              .then(() => {
                res.status(200).json({staus: 'OK', data: subdivision})
              })
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
        // if we don`t need to update parent_it we will just update another data
        if (req.body.parent_id === undefined || req.body.parent_id === null
          || req.body.parent_id === position.parent_id) {
          position.name = ('name' in req.body) ? req.body.name : position.name
          position.subTitle = ('subTitle' in req.body) ? req.body.subTitle : position.subTitle

          position.save((err) => {
            if (err)
            {
              res.status(500).send(err)
            } else {
              res.status(200).json({status: "OK", data: position})
            }
          })
          
        } else { // if we need to update parent_id we need to get old end new parent subdivision
          Subdivision.findByIdAsync(position.parent_id)
            .then((subdivision) => {
              let oldSubdivision = subdivision

              Subdivision.findByIdAsync(req.body.parent_id)
                .then((subdivision) => {
                  let newSubdivision = subdivision

                  if (newSubdivision !== undefined && newSubdivision !== null) {
                    position.name = ('name' in req.body) ? req.body.name : position.name
                    position.subTitle = ('subTitle' in req.body) ? req.body.subTitle : position.subTitle
                    position.parent_id = req.body.parent_id

                    newSubdivision.subnodes.push(req.params.id)

                    if (oldSubdivision !== undefined && oldSubdivision !== null) {
                      // if oldSubdivision exists in db we chenge subdivisions by deleting subdivision 
                      console.log(oldSubdivision._id)
                      console.log(oldSubdivision.subnodes.indexOf(position._id))
                      oldSubdivision.subnodes.splice(oldSubdivision.subnodes.indexOf(position._id), 1)
                      oldSubdivision.save((err) => {
                        if (err) {
                          throw err
                        }
                      })
                    }

                      // save results
                      newSubdivision.save((err) => {
                        if (err) {
                          throw err
                        }
                      })
                      position.save((err) => {
                        if (err) {
                          throw err
                        }
                      })

                      res.status(200).json({status: 'OK', body: position})
                  } else {
                    // if newSubdivision is undefined then we can`t update it
                    res.status(500).json({data: 'Can`t find subdivision with id : ' + req.body.parent_id,
                      position: position,
                    subdivision: subdivision }).end()
                  }
                })
            })
        }
      }
    })
}
