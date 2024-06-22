const express = require('express');
const router = express.Router();
const PaquetesModel = require("../models/PaquetesModel.js")
router.use(express.json()); // Middleware para parsear el cuerpo de la solicitud como JSON


// MOSTRAR TODOS LOS REGISTROS - READ - GET
 const traerPaquetes= async (req,res)=>{
    try {
        const posteos = await PaquetesModel.findAll() //  metodo de sequelize
        if (posteos.length === 0) {
    return res.status(404).json({ message: 'No hay paquetes cargados' }); // Aquí respondemos con un mensaje de error y un código 404
  }
  res.json(posteos);     
    } catch (error) {
        res.json({message:error.message}) 
    }
}


  const traerUnPaquete= async (req,res)=>{
    try {
        const posteos = await PaquetesModel.findByPk(req.params.id) //  metodo de sequelize
        res.json (posteos)
    } catch (error) {
        res.json({message:error.message}) 
    }
}
  const crearUnPaquete= async (req,res)=>{
      try {
          req.body.img_paquete = `/uploads/${req.body.img_paquete}`;    // Crear el paquete en la base de datos utilizando Sequelize
    const nuevoPaquete = await PaquetesModel.create(req.body);
    console.log(nuevoPaquete)
    res.status(201).json(req.body); // Respondemos con el paquete creado y un código 201 (creado)
    } catch (error) {
        res.json({message:error.message}) 
    }
}
  const actualizarPaquete= async (req,res)=>{
    try {
        const posteos = await PaquetesModel.update(req.body,{
            where :{id:req.params.id}
        })
        res.json({"message": "Registro actualizado correctamente"}) 
    } catch (error) {
        res.json({message:error.message}) 
    }
}
  const borrarPaquete= async (req,res)=>{
    try {
        const posteos = await PaquetesModel.destroy({where :{idpaquetes:req.params.id}})
        res.json({"message": "Paquete Borrado correctamente"}) 
    } catch (error) {
        res.json({message:error.message}) 
    }
}


module.exports = {borrarPaquete, actualizarPaquete, crearUnPaquete,traerPaquetes,traerUnPaquete}