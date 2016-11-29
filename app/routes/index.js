const express = require('express')
const router = express.Router()

const divisions = require('./division/divisions')
const subdivision = require('./subdivision/subdivisions')
const position = require('./position/positions')
const requirement = require('./requirement/requirements')
const user = require('./user/users')
exports.router = router

router.route ('/user')
  .post(user.create)
  .get(user.getAll)

router.route('/divisions')
  .get(divisions.getAll)
  .post(divisions.create)

router.route('/divisions/:id')
  .delete(divisions.remove)
  .get(divisions.get)
  .put(divisions.update)

router.route('/divisions/:d_id/subdivisions')
  .get(divisions.subdivisions.getAll)

router.route('/divisions/:d_id/subdivisions/:s_id')
  .post(divisions.subdivisions.add)
  .delete(divisions.subdivisions.remove)
 
router.route('/subdivisions')
  .get(subdivision.getAll)
  .post(subdivision.create)

router.route('/subdivisions/:id')
  .delete(subdivision.remove)
  .put(subdivision.update)
  .get(subdivision.get)

router.route('/subdivisions/:s_id/positions')
  .get(subdivision.positions.getAll)

router.route('/subdivisions/:s_id/positions/:p_id')
  .post(subdivision.positions.add)
  .delete(subdivision.positions.remove)

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

  router.route('/user/:id')
  .delete(user.remove)
  .put(user.update)
  .get(user.get)