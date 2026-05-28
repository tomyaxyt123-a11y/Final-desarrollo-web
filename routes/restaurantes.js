'use strict';

let express = require('express');
let router = express.Router();
let restauranteController = require('../controllers/restaurantes');
let auth = require('../helpers/auth');


router.post('/api/restaurantes', auth.validateToken, restauranteController.crearRestaurante);
router.get('/api/restaurantes', auth.validateToken, restauranteController.consultarTodos);
router.get('/api/restaurantes/:restauranteId', auth.validateToken, restauranteController.consultarPorId);
router.delete('/api/restaurantes/:restauranteId', auth.validateToken, restauranteController.borrarPorId);
router.put('/api/restaurantes/:restauranteId', auth.validateToken, restauranteController.actualizarRestaurante);

module.exports = router;
