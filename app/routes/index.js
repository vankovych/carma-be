const express = require('express')
const router = express.Router()

const divisions = require('./divisions')

exports.router = router

router.route('/divisions')
  .get(divisions.getAll)
  .post(divisions.create)

router.route('/divisions/:id')
  .delete(divisions.remove)
  .get(divisions.get)
  .put(divisions.update)

const subdivision = require('./subdivisions')

router.route('/subdivisions')
  .get(subdivision.getAll)
  .post(subdivision.create)

router.route('/subdivisions/:id')
  .delete(subdivision.remove)
  .put(subdivision.update)
  .get(subdivision.get)

const position = require('./positions')

router.route('/positions')
  .post(position.create)
  .get(position.getAll)

router.route('/positions/:id')
  .delete(position.remove)
  .get(position.get)
  .put(position.update)
