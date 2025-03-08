const { Alquiler } = require("../models");
const AutoController = require("../controllers/autosController");

const crearAlquiler = async (req, res) => {
  try {
    const { fechaInicio, fechaFin, idCliente, idAuto } = req.body;

    const nuevoAlquiler = await Alquiler.create({
      fechaInicio,
      fechaFin,
      idCliente,
      idAuto,
    });

    await AutoController.cambiarEstado(idAuto, 0);

    res.json(nuevoAlquiler);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const mostrarAlquileres = async (req, res) => {
  try {
    const historialAlquileres = await Alquiler.findAll();

    res.json(historialAlquileres);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

module.exports = { crearAlquiler, mostrarAlquileres };
