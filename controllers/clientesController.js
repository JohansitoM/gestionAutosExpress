const { Cliente } = require('../models')

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
module.exports = { crearCliente }