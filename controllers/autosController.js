const { Auto } = require('../models')

const crearAuto = async (req, res) => {
    try {
        const { marca, modelo, year, estado } = req.body
        const nuevoAuto = await Auto.create({ marca, modelo, year, estado })

        res.json({ auto: nuevoAuto })
    } catch(e) {
        res.status(500).json({ error: e})
    }   
}

const mostrarAutosDisponibles = async (req, res) => {
    try {
        const autosDisponibles = await Auto.findAll({
            where: {
                estado: "Disponible"
            }
        })

        res.json(autosDisponibles)
    } catch(e) {
        res.status(500).json({ error: e.message })
    }
}

const cambiarEstado = async (idAuto, estado) => {
    try {
        const actualizado = await Auto.update(
            { estado: estado },
            { where: { id: idAuto } }
        )

        return actualizado
    } catch(e) {
        throw new Error(e)
    }
}

module.exports = { crearAuto, mostrarAutosDisponibles, cambiarEstado }