const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const UserModel = require("../models/UserModel.js")
router.use(express.json()); // Middleware para parsear el cuerpo de la solicitud como JSON


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
      const user = await UserModel.findOne({ where: { mail: req.body.mail } });
      console.log(user)
        if (user) {
        return res.status(404).json({ message: "Email existente" });
      }
      
      // Asignar valor por defecto a superUsu si no está presente en el cuerpo de la solicitud
    const { superUsu = 0, nombre, apellido, mail, password } = req.body;
      
    if (req.body.password ) {
            const saltRounds = 5;
            const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
            req.body.password = hashedPassword;
        }
    const nuevoUsuario = await UserModel.create({
      nombre,
      apellido,
      mail,
      password,
      superUsu
    });
    console.log(nuevoUsuario)
       return res.status(201).json({ message: "Usuario creado exitosamente", usuario: nuevoUsuario });
    } catch (error) {
         console.error("Error en la solicitud:", error.message);
        return res.status(500).json({ message: "Error en el servidor al crear usuario" });
    }
}
  const actualizarUsuario= async (req,res)=>{
    try {
        const user = await UserModel.findOne({ where: { idusuarios: req.params.id } });
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        // Hashear la contraseña solo si no está ya hasheada
        if (req.body.password && !req.body.password.startsWith('$2b$')) {
            const saltRounds = 5;
            const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
            req.body.password = hashedPassword;
        }

        // Actualizar el usuario con los nuevos datos
        await user.update(req.body);
        console.log(req.body);

        res.json({"message": "Registro actualizado correctamente"}) 
    } catch (error) {
        res.json({message:error.message}) 
    }
}
  const borrarUsuario= async (req,res)=>{
    try {
        const  user = await  UserModel.destroy({where :{idusuarios:req.params.id}})
        res.json({"message": "usuario Borrado correctamente"}) 
    } catch (error) {
        res.json({message:error.message}) 
    }
}


const Login = async (req, res) => {
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
};
 


module.exports = {borrarUsuario, actualizarUsuario, crearUnUsuario, traerUsuarios,traerUnUsuario , Login}
