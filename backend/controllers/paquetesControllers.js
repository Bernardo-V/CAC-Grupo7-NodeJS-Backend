const PaquetesModel = require ("../models/PaquetesModel.js")

/* CRUD */
//LEER TODOS LOS PAQUETES
const traerPaquetes= async (req,res)=>{
    //res.send("Te envio desde la BD todos los paquetes")
    try {
        const paquetes = await PaquetesModel.findAll() // metodo de sequelize
        res.json(paquetes)
        console.log("Trayendo OK desde la BD todos los paquetes");
        
    } catch (error) {
        res.json({message: error.message})
        
    }
}

/* MOSTRAR UN REGISTRO  - READ - GET */
const traerUnPaquete= async (req,res)=>{
    try {
        const paquete = await PaquetesModel.findByPk(req.params.id)
        res.json(paquete)
    } catch (error) {
        res.json({message:error.message}) 
    }
    }


/* CREAR UN REGISTRO - CREATE - POST */
const crearPaquete = async (req,res)=>{
    try {
        await PaquetesModel.create(req.body)
        res.json({"message": "Registro creado correctamente"})
    } catch (error) {
        res.json({message:error.message}) 
    }
}


/* ACTUALIZAR UN REGISTRO - UPDATE - PUT */

const actualizarPaquete = async (req,res) =>{
    try {
        await PaquetesModel.update(req.body,{
            where :{idpaquetes:req.params.id}
        })
        res.json({"message": "Registro actualizado correctamente"}) 
    } catch (error) {
        res.json({message:error.message}) 
    }
}


/* BORRAR UN REGISTRO - DELETE */
const borrarPaquete = async (req,res)=>{
    try {
        await PaquetesModel.destroy({where :{idpaquetes:req.params.id}})
        res.json({"message": "Registro Borrado correctamente"}) 
    } catch (error) {
        res.json({message:error.message}) 
    }
}


module.exports= {traerPaquetes, traerUnPaquete, crearPaquete, actualizarPaquete, borrarPaquete}