'use strict';

let express = require('express');
let bodyParser = require('body-parser');
let routerCarros = require('./routes/restaurantes');
let routerUsuarios = require('./routes/users');
let cors = require('cors');

let application = express();

application.use(cors());
application.use(bodyParser.json()); // Transforma el boy a Json automaticamente
application.use(routerCarros);
application.use(routerUsuarios);

module.exports = application;
