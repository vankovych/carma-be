const express = require('express')
const router = express.Router()

const divisions = require('./division/divisions')
const subdivision = require('./subdivision/subdivisions')
const position = require('./position/positions')
const requirement = require('./requirement/requirements')

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