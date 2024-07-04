const express = require('express');
const router = express.Router();
require('dotenv').config();

const ComentariosModel = require("../models/ComentarioModel.js")
router.use(express.json()); // Middleware para parsear el cuerpo de la solicitud como JSON


 const traerComentarios= async (req,res)=>{
    try {
        const comentarios = await ComentariosModel.findAll() //  metodo de sequelize
        if ( comentarios.length === 0) {
    return res.status(404).json({ message: 'No hay Comentarios cargados' }); // Aquí respondemos con un mensaje de error y un código 404
  }
  res.json( comentarios );     
    } catch (error) {
        res.json({message:error.message}) 
    }
}

  const crearUnComentario= async (req,res)=>{
    try {
      // Asignar valor por defecto a superUsu si no está presente en el cuerpo de la solicitud
    const { nombre, apellido, mail, comentario } = req.body;
    const nuevoComentario = await ComentariosModel.create({
      nombre,
      apellido,
      mail,
      comentario
    });
    console.log(nuevoComentario)
       return res.status(201).json({ message: "Comentario creado exitosamente", comentario: nuevoComentario });
    } catch (error) {
         console.error("Error en la solicitud:", error.message);
        return res.status(500).json({ message: "Error en el servidor al crear usuario" });
    }
}

module.exports = {crearUnComentario, traerComentarios}
