const clienteController = require('../controllers/clientesController')
const express = require('express')
const route = express.Router()

route.post('/clientes', clienteController.crearCliente)

module.exports = route