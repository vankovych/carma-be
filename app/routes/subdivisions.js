const Subdivision = require('../models/subdivision')
const Division = require('../models/division')
const mongoose = require('mongoose')

exports.create = create
exports.getAll = getAll
exports.get = get
exports.remove = remove
exports.update = update

function create (req, res, next) {
  if (req.body.parent_id === undefined) {
    res.status(500).end()
    return
  } else {
    const subdivision = new Subdivision()
    subdivision.name = req.body.name
    subdivision.subTitle = req.body.subTitle
    subdivision.parent_id = req.body.parent_id
    subdivision._id = mongoose.Types.ObjectId()
    subdivision.subnodes = []

    Division.findByIdAsync(req.body.parent_id)
      .then(division => {
        if (division !== null) {
          console.log(subdivision._id)
          division.subdivisions.push(subdivision._id)
          division.save()
          subdivision.save()

          res.json({status: 'OK', data: subdivision})
        }else {
          res.status(500).json({data: 'Wrong parent id'})
        }
      })
      .catch(next)
  }
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
      Division.findByIdAsync(subdivision.parent_id)
        .then(division => {
          // if parent division is undefined we willn`t update it
          if (division !== undefined && division !== null) {
            division.subdivisions.splice(division.subdivisions.indexOf(subdivision._id), 1)
            division.save()
          }
          Subdivision.remove({ _id: req.params.id })
            .then(() => {
              res.json({ status: 'OK', data: req.params })
            })
        })
    })
    .catch(next)
}

function update (req, res, next) {
  Subdivision.findByIdAsync(req.params.id)
    .then(subdivision => {

      if (subdivision === null || subdivision === undefined) {
        res.status(404).end()
      }

      // If we shouldn`t change parent_id
      if (req.body.parent_id === undefined || (req.body.parent_id === subdivision.parent_id)) {
        subdivision.name = ('name' in req.body) ? req.body.name : subdivision.name
        subdivision.subTitle = ('subTitle' in req.body) ? req.body.subTitle : subdivision.subTitle

        subdivision.save((err) => {
          if (err) {
            throw err
          }
        })

        res.status(200).json({status: 'OK', body: subdivision}).end()
      }else {
        Division.findByIdAsync(subdivision.parent_id)
          .then(division => {

            let oldDivision = division

            Division.findByIdAsync(req.body.parent_id)
              .then(division => {

                if (division !== undefined && division !== null) {
                  let newDivision = division

                  // set updated data to subdivision
                  subdivision.name = ('name' in req.body) ? req.body.name : subdivision.name
                  subdivision.subTitle = ('subTitle' in req.body) ? req.body.subTitle : subdivision.subTitle
                  subdivision.parent_id = req.body.parent_id

                  // add subdivision to newDivision.dubdivision
                  newDivision.subdivisions.push(req.params.id)

                  // if oldDividion is undefined, well we willn`t update it, end just leave it 
                  if (oldDivision !== undefined && oldDivision !== null) {
                    // if oldDivision exists in db we chenge subdivisions by deleting subdivision 
                    oldDivision.subdivisions.splice(oldDivision.subdivisions.indexOf(req.params.id), 1)
                    oldDivision.save((err) => {
                      if (err) {
                        throw err
                      }
                    })
                  }
                  // save results
                  newDivision.save((err) => {
                    if (err) {
                      throw err
                    }
                  })
                  subdivision.save((err) => {
                    if (err) {
                      throw err
                    }
                  })

                  res.status(200).json({status: 'OK', body: subdivision})
                }else {
                  // if newDivision is undefined then we can`t update it
                  res.status(500).json({data: 'Can`t find division with id : ' + subdivision.parent_id,
                    subdivision: subdivision,
                  division: division }).end()
                }
              })
          })
      }
    })
    .catch(next)
}