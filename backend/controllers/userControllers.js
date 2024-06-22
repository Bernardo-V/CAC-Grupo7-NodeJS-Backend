const express = require('express');
const router = express.Router();
const UserModel = require("../models/UserModel.js")
router.use(express.json()); // Middleware para parsear el cuerpo de la solicitud como JSON


// MOSTRAR TODOS LOS REGISTROS - READ - GET
 const traerUsuarios= async (req,res)=>{
    try {
        const  usuarios = await UserModel.findAll() //  metodo de sequelize
        if ( usuarios.length === 0) {
    return res.status(404).json({ message: 'No hay  usuarios cargados' }); // Aquí respondemos con un mensaje de error y un código 404
  }
  res.json( usuarios);     
    } catch (error) {
        res.json({message:error.message}) 
    }
}


  const traerUnUsuario= async (req,res)=>{
    try {
        const  user = await  UserModel.findByPk(req.params.id) //  metodo de sequelize
        res.json ( user)
    } catch (error) {
        res.json({message:error.message}) 
    }
}
  const crearUnUsuario= async (req,res)=>{
  try {
    // Crear el paquete en la base de datos utilizando Sequelize
    const nuevoPaquete = await  UserModel.create(req.body);
    console.log(nuevoPaquete)
    res.status(201).json(req.body); // Respondemos con el paquete creado y un código 201 (creado)
    } catch (error) {
        res.json({message:error.message}) 
    }
}
  const actualizarUsuario= async (req,res)=>{
    try {
        const  user = await  UserModel.update(req.body,{
            where :{id:req.params.id}
        })
        res.json({"message": "Registro actualizado correctamente"}) 
    } catch (error) {
        res.json({message:error.message}) 
    }
}
  const borrarUsuario= async (req,res)=>{
    try {
        const  user = await  UserModel.destroy({where :{idpaquetes:req.params.id}})
        res.json({"message": "usuario Borrado correctamente"}) 
    } catch (error) {
        res.json({message:error.message}) 
    }
}


module.exports = {borrarUsuario, actualizarUsuario, crearUnUsuario, traerUsuarios,traerUnUsuario}
