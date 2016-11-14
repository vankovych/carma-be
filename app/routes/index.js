const express = require('express');
const router = express.Router();

const divisions = require('./divisions');

exports.router = router;

router.route('/divisions')
  .get(divisions.getAll)
  .post(divisions.create);

router.route('/divisions/:id')
  .delete(divisions.remove)
  .get(divisions.get)
  .put(divisions.update);
