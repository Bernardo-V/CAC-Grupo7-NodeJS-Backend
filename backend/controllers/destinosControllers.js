const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const DestinosModel = require("../models/DestinosModel.js")
router.use(express.json()); // Middleware para parsear el cuerpo de la solicitud como JSON


 const traerDestinos= async (req,res)=>{
    try {
        const  destinos = await DestinosModel.findAll() //  metodo de sequelize
        if ( destinos.length === 0) {
    return res.status(404).json({ message: 'No hay destinos cargados' }); // Aquí respondemos con un mensaje de error y un código 404
  }
  res.json( destinos);     
    } catch (error) {
        res.json({message:error.message}) 
    }
}


  const traerUnDestino= async (req,res)=>{
    try {
        const  destino = await  DestinosModel.findByPk(req.params.id) //  metodo de sequelize
        res.json ( destino)
    } catch (error) {
        res.json({message:error.message}) 
    }
}
  const crearUnDestino= async (req,res)=>{
    try {
      const destino = await DestinosModel.findOne({ where: { id: req.body.mail } });
      console.log(destino)
        if (destino) {
        return res.status(404).json({ message: "Id existente" });
      }
      
      // Asignar valor por defecto a superUsu si no está presente en el cuerpo de la solicitud
    const { superDest = 0, titulo_destino, descripcion_destino, region_destino, ciudad, provincia, pais, img_destino } = req.body;
      
/*     if (req.body.password ) {
            const saltRounds = 5;
            const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
            req.body.password = hashedPassword;
        } */
    const nuevoDestino = await DestinosModel.create({
      titulo_destino,
      descripcion_destino,
      region_destino,
      ciudad,
      provincia,
      pais,
      img_destino,
      superDest
    });
    console.log(nuevoDestino)
       return res.status(201).json({ message: "Destino creado exitosamente", destino: nuevoDestino });
    } catch (error) {
         console.error("Error en la solicitud:", error.message);
        return res.status(500).json({ message: "Error en el servidor al crear destino" });
    }
}
  const actualizarDestino= async (req,res)=>{
    try {
        const destino = await DestinosModel.findOne({ where: { iddestinos: req.params.id } });
        if (!destino) {
            return res.status(404).json({ message: "Destino no encontrado" });
        }
        // Hashear la contraseña solo si no está ya hasheada
/*         if (req.body.password && !req.body.password.startsWith('$2b$')) {
            const saltRounds = 5;
            const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
            req.body.password = hashedPassword;
        } */

        // Actualizar el destino con los nuevos datos
        await destino.update(req.body);
        console.log(req.body);

        res.json({"message": "Registro actualizado correctamente"}) 
    } catch (error) {
        res.json({message:error.message}) 
    }
}
  const borrarDestino= async (req,res)=>{
    try {
        const  destino = await  DestinosModel.destroy({where :{iddestinosos:req.params.id}})
        res.json({"message": "destino Borrado correctamente"}) 
    } catch (error) {
        res.json({message:error.message}) 
    }
}


/* const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userFound = await UserModel.findOne({ where: { mail: email } });
    if (!userFound) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Contraseña Invalida" });
    }

    const token = jwt.sign(
      { id: userFound.idusuarios, email: userFound.email, rol: userFound.superUsu },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    const cookieOption = {
      expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      path: "/"
    };
    res.cookie("jwt", token, cookieOption);

    return res.json({
      status: "ok",
      message: "Usuario loggeado",
      redirect: "/miperfil"
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}; */
 


module.exports = {borrarDestino, actualizarDestino, crearUnDestino, traerDestinos,traerUnDestino}