const Division = require('./../../models/division')
const Subdivision = require('./../../models/subdivision')
const mongoose = require('mongoose')
const logger = require('./../../libs/logger').logger

exports.getAll = getAll
exports.add = add
exports.remove = remove

function getAll (req, res, next) {
  Division.findByIdAsync(req.params.d_id)
    .then(division => {
      if (division !== null && division !== undefined) {
        res.status(200).json({ status: 'OK', data: division.subdivisions})
      } else {
        res.status(404).json({error: `Can't find division with id ${req.params.d_id}.`})
      }
    })
    .catch(err => {
      logger.error(err)
      res.status(500).json({error: err})
    })
}

function add (req, res, next) {
  Division.findByIdAsync(req.params.d_id)
    .then(division => {
      if (division !== null && division !== undefined) {
        return division
      } else {
        throw `Can't find division with id ${req.params.d_id}.`
      }
    })
    .then(division => {
      Subdivision.findByIdAsync(req.params.s_id)
        .then(subdivision => {
          if (subdivision !== null && subdivision !== undefined) {
            if (!division.subdivisions.includes(subdivision._id)) {
              division.subdivisions.push(subdivision._id)
              division.save(err => {
                if (err) {
                  logger.error(err)
                  res.status(500).json({error: err})
                } else {
                  res.status(200).json({status: "OK", data: division})
                }
              })
            } else {
              res.status(200).json({status: "OK", data: division})
            }
          } else {
            throw `Can't find subdivision with id ${req.params.d_id}.`
          }
        })
    })
    .catch(err => {
      logger.error(err)
      res.status(500).json({error: err})
    })
}

function remove (req, res, next) {
  Division.findByIdAsync(req.params.d_id)
    .then(division => {
      if (division) {
        division.subdivisions.splice(division.subdivisions.indexOf(req.params.s_id),1)
        division.save(err => {
          if (err) {
            logger.error(err)
            res.status(500).json({error: err})
          } else {
            res.status(200).json({status: "OK", data: division})
          }
        })
      } else {
        res.status(404).json({error: `Can't find division with id ${req.params.d_id}`})
      }
    })
    .catch(err => {
      logger.error(err)
      res.status(500).json({error: err})
    })
}