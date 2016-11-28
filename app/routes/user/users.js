const User = require('./../../models/user')
const mongoose = require('mongoose')

exports.create = create
exports.getAll = getAll
exports.remove = remove
exports.update = update
exports.get = get

function create (req, res, next) {
  const user = new User()
  var passw = /^[A-Za-z]\w{7,14}$/
    


  if (!req.body.password.match(passw) || !req.body.login.match(passw)) {
    res.status(400).json({error: 'Please check your login or password'})
  } else {
    user.login = req.body.login
    user.password = req.body.password
    user._id = mongoose.Types.ObjectId()

    user.save(err => {
      if (err) {
        res.send(err)
        console.log(err)
      }
      res.json({ status: 'OK', data: user })
    })
      .catch(next)
  }
}

function getAll (req, res, next) {
  User.findAsync()
    .then((users) => {
      res.status(200).json({status: 'OK', data: users})
    })
    .catch(next)
}

function remove (req, res, next) {
  User.findByIdAsync(req.params.id)
    .then((user) => {
      if (user === undefined || user === null) {
        res.status(404).json({data: `Can't find user with id ${req.params.id}`})
      } else {
        user.remove(err => {
          if (err) {
            res.send(err)
          } else {
            res.status(200).json({status: 'OK', data: user})
          }
        })
      }
    })
    .catch(next)
}
function update (req, res, next) {
  User.findByIdAsync(req.params.id)
    .then(user => {
         if (user === undefined || user === null) {
        res.status(404).json({data: `Can't find user with id ${req.params.id}`})
      } else {
      user.login = req.body.login
      user.password = req.body.password

      user.save(err => {
        if (err) {
          res.send(err)
        }

        res.json({ status: 'OK' })
      })
      }
    })
    .catch(next)
}

function get (req, res, next) {
  User.findByIdAsync(req.params.id)
    .then(user => {
      if (user) {
        res.json({ status: 'OK', data: user })
      } else {
        res.status(404).end()
      }
    })
    .catch(next)
}
