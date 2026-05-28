'use strict';

let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let restauranteSchema = Schema(
    {
        nombre : String,
        calificacion : Number,
        fechavisita : Date,
        observaciones : String,
        usuarioId : String
    }
);

module.exports = mongoose.model('restaurantes', restauranteSchema);
