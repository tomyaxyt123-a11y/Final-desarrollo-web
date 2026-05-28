'use strict';

let Restaurante = require('../models/restaurantes');

function crearRestaurante(req, resp) { // Crear una nueva reseña de un restaurante
    let requestBody = req.body;

    if (!requestBody) {
        resp.status(400).send({ 'message': 'no body was sent' });
    }
    else if (!requestBody.calificacion || !requestBody.fechavisita) {
        resp.status(400).send({ 'message': 'missing mandatory fields' });
    }
    else {
        let nuevoRestaurante = new Restaurante();

        nuevoRestaurante.nombre = requestBody.nombre;
        nuevoRestaurante.calificacion = requestBody.calificacion;
        nuevoRestaurante.fechavisita = requestBody.fechavisita;
        nuevoRestaurante.observaciones = requestBody.observaciones;
        nuevoRestaurante.usuarioId = req.userId;

        nuevoRestaurante.save().then(
            (restauranteCreado) => {
                resp.status(200).send({ 'message': 'restaurante created', 'restaurante': restauranteCreado });
            },
            err => {
                resp.status(500).send({ 'message': 'internal error', 'error': err })
            }
        );
    }
}

function consultarTodos(req, resp) {
    Restaurante.find({}).then(
        (restaurantes) => {
            resp.status(200).send(restaurantes);
        }
    ).catch(
        (err) => {
            resp.status(500).send({ message: 'Error al consultar restaurantes' });
        }
    );
}

function consultarPorId(req, resp) { // leer una reseña de un restaurante por su id
    let restauranteId = req.params.restauranteId;
    Restaurante.findById(restauranteId).then(  /// Restaurante.find({"_id": restauranteId }).then( 
        (restaurante) => {
            resp.status(200).send(restaurante);
        }
    ).catch(
        (err) => {
            resp.status(500).send({ message: 'Error al consultar restaurante' });
        }
    );
}

function borrarPorId(req, resp) { // eliminar una reseña de un restaurante por su id
    let restauranteId = req.params.restauranteId;
    let userId = req.userId;

    Restaurante.findById(restauranteId).then(
        (restaurante) => {
            if (!restaurante) {
                return resp.status(404).send({ message: 'Reseña no encontrada' });
            }
            // Solo restringir si existe un dueño asignado
            if (restaurante.usuarioId && restaurante.usuarioId !== userId) {
                return resp.status(403).send({ message: 'No tienes permisos para eliminar esta reseña' });
            }
            
            Restaurante.findByIdAndDelete(restauranteId).then(
                () => {
                    resp.status(200).send({ message: 'Restaurante eliminado' });
                }
            ).catch(
                (err) => {
                    resp.status(500).send({ message: 'Error al eliminar restaurante' });
                }
            );
        }
    ).catch(
        (err) => {
            resp.status(500).send({ message: 'Error al buscar el restaurante' });
        }
    );
}

function actualizarRestaurante(req, resp) {

    let restauranteId = req.params.restauranteId;
    let requestBody = req.body;

    if (!requestBody) {
        resp.status(400).send({ 'message': 'no body was sent' });
    }
    else if (!requestBody.calificacion || !requestBody.fechavisita) {
        resp.status(400).send({ 'message': 'missing mandatory fields' });
    }

    else {
        let userId = req.userId;

        Restaurante.findById(restauranteId).then(
            (restaurante) => {
                if (!restaurante) {
                    return resp.status(404).send({ message: 'Reseña no encontrada' });
                }
                // Solo restringir si existe un dueño asignado
                if (restaurante.usuarioId && restaurante.usuarioId !== userId) {
                    return resp.status(403).send({ message: 'No tienes permisos para actualizar esta reseña' });
                }

                Restaurante.findByIdAndUpdate(restauranteId,
                    {
                        nombre: requestBody.nombre,
                        calificacion: requestBody.calificacion,
                        fechavisita: requestBody.fechavisita,
                        observaciones: requestBody.observaciones

                    }, { new: true }).then(
                        (restauranteActualizado) => {
                            resp.status(200).send({ message: restauranteActualizado });
                        }
                    ).catch(
                        (err) => {
                            resp.status(500).send({ message: 'Error al actualizar restaurante' });
                        }
                    );
            }
        ).catch(
            (err) => {
                resp.status(500).send({ message: 'Error al buscar el restaurante' });
            }
        );
    }
}


module.exports = { crearRestaurante, consultarTodos, consultarPorId, borrarPorId, actualizarRestaurante };
