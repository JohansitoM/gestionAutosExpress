const { Cliente } = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// const login = async (req, res) => {
//     const { correo, password }= req.body;
//     try {
//         const user = await Cliente.findOne({ where: { correo } })
//         if(!user) return res.status(404).json({ error: 'Usuario no encontrado' })

//         const isMatch = await bcrypt.compare(password, user.password)
//         if(!isMatch) return res.status(400).json({ error: 'Contraseña incorrecta x_X'})
        
//         const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn:'1d' })
//         res.status(200).json({ message: "Inico de sesión exitoso :D", token, user: { id: user.id, email: user.correo, name: user.nombre },  })
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({ error: 'Error al iniciar sesión' })
//     }
// }

const login = async(req, res)=>{
    const {correo, password}= req.body;
    try{
      const cliente = await Cliente.findOne({where:{correo}});
      if (!cliente ){
        return res.status(404).json({mjs:"Cliente no encontrado"})
      }
      const passwordValido = await bcrypt.compare(password, cliente.password);
   
      if (!passwordValido){
        return res.status(401).json({mjs:"Contraseña incorrecta"})
      }

      res.status(200).json({ msj:"Iniciaste sesion con exito", cliente })
    }catch(error){
      console.error("Error al iniciar sesion:", error);
      res.status(500).json({msj:"Error al iniciar sesion", error:error.message})
    }
  };

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
module.exports = { crearCliente, mostrarClientes, registrarCliente, login }