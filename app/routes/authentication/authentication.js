const User = require('./../../models/user')
const mongoose = require('mongoose')
const randToken = require('rand-token')
const express = require('express')
const router = express.Router()

router.post('/login', function login (req, res, next) {
  User.findOneAsync({login: req.body.login, password: req.body.password})
    .then(user => {
      if (user) {
        console.log(user.token)
        if (user.token === null) {
          user.token = randToken.generate(16)
        }
        user.save(err => {
          if (err) {
            res.send(err)
          } else {
            res.status(200).json({token: user.token})
          }
        })
      } else {
        res.status(404).json({error: `Login or password are uncorrect. Please try again =)`})
      }
    })
})

router.post('/logout', function logout (req, res, next) {
  User.findOneAsync({token: req.body.token})
    .then(user => {
      if (user) {
        user.token = null
        user.save(err => {
          if (err) {
            res.send(err)
          } else {
            res.status(200).json({message: `You was successfully logout ${JSON.stringify(user)}`})
          }
        })
      } else {
        res.status(400).json({error: `You are already logout`})
      }
    })
})

exports.router = router
