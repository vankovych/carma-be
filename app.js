const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');

const db = require('./app/libs/db');
// const logger = require('./app/libs/logger').logger;
const router = require('./app/routes').router;

const app = express();

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use('/api', router);

const server = app.listen(3000, () => {
  console.log(`Listening at http://localhost:3000`);
});

// TODO: Linter
// TODO: Config file
// TODO: logger
// TODO: auth
