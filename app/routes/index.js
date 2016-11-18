const express = require('express')
const router = express.Router()

const divisions = require('./divisions')
const subdivision = require('./subdivisions')
const position = require('./positions')
const requirement = require('./requirements')

exports.router = router

router.route('/divisions')
  .get(divisions.getAll)
  .post(divisions.create)

router.route('/divisions/:id')
  .delete(divisions.remove)
  .get(divisions.get)
  .put(divisions.update)


router.route('/subdivisions')
  .get(subdivision.getAll)
  .post(subdivision.create)

router.route('/subdivisions/:id')
  .delete(subdivision.remove)
  .put(subdivision.update)
  .get(subdivision.get)


router.route('/positions')
  .post(position.create)
  .get(position.getAll)

router.route('/positions/:id')
  .delete(position.remove)
  .get(position.get)
  .put(position.update)


router.route('/requirements')
  .get(requirement.getAll)
  .post(requirement.create)

router.route('/requirements/:id')
  .get(requirement.get)
  .delete(requirement.remove)
  .put(requirement.update)