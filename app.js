
const bodyParser = require('body-parser')
const express = require('express')
const bunyan = require('bunyan')
const bunyanMiddleware = require('bunyan-middleware')
const passport = require('passport')
const Strategy = require('passport-http-bearer')
const User = require('./app/models/user')
const auth = require('./app/routes/authentication/authentication').router
const mongoose = require('mongoose')

const db = require('./app/libs/db')
const logger = require('./app/libs/logger').logger
const router = require('./app/routes').router

const app = express()

db.connect()

passport.use(new Strategy(
    function(token, cb) {
        User.findAsync({ token: token })
            .then(user => {
                if (user.length > 0) {
                    return { err: null, user: user[0] }
                } else {
                    return { err: null, user: null }
                }
            })
            .then(data => {
                if (data.err) {
                    return cb(err, null)
                }
                if (!data.user) {
                    return cb(null, false)
                }
                return cb(null, data.user)
            })
    }))


var allowCrossDomain = function(req, res, next) {
    if ('OPTIONS' == req.method) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
        res.send(200);
    } else {
        next();
    }
};

app.use(allowCrossDomain);


app.use(bunyanMiddleware({
    headerName: 'X-Request-Id',
    propertyName: 'reqId',
    logName: 'req_id',
    obscureHeaders: [],
    logger: logger,
    additionalRequestFinishData: function(req, res) {
        return { example: true };
    }
}))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/', auth)
app.use('/api', passport.authenticate('bearer', { session: false }), router)

const server = app.listen(3000, () => {
    User.findAsync()
        .then(users => {
            if (users.length === 0) {
                const user = new User()
                user.login = "admin"
                user.password = "admin"
                user._id = mongoose.Types.ObjectId()
                user.token = null
                user.save(err => {
                    if (err) console.log(err)
                })
            }
        })
    console.log(`Listening at http://localhost:3000`)
})