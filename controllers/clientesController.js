const { Cliente } = require('../models')
const bcrypt = require('bcrypt')

const crearCliente = async(req, res) => {
    try {
        const { nombre, correo, numeroLicencia } = req.body

        const nuevoCliente = await Cliente.create({ nombre, correo, numeroLicencia })
        console.log(nuevoCliente)

        res.json({cliente: nuevoCliente})
    } catch(e) {
        res.status(500).json({error: e.message})
    }
}

const mostrarClientes = async(req, res) => {
    try {
        const clientes = await Cliente.findAll()
        res.json(clientes)
    } catch(e) {
        console.log(e)
        res.status(500).json({error: e.message})
    }
}

const registrarCliente = async (req, res) => {
    try {
        const { nombre, correo, numeroLicencia, password } = req.body
        const hashedPassword = await bcrypt.hash(password, 10)
        const nuevoCliente = await Cliente.create({ nombre, correo, numeroLicencia, password: hashedPassword})

        res.status(201).json({ cliente: nuevoCliente })
    } catch (error) {
        console.log("Error al registrar el cliente: ", error)
        res.status(500).json({ error: "Error al registrar el cliente" })
    }
}
module.exports = { crearCliente, mostrarClientes, registrarCliente }