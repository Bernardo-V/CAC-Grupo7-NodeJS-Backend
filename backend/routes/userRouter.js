const express = require ("express")
const router = express.Router()
const path = require('path');

router.use(express.json()); // Middleware para parsear el cuerpo de la solicitud como JSON



const {crearUnUsuario,traerUsuarios,Login,traerUnUsuario,actualizarUsuario,borrarUsuario } = require ("../controllers/userControllers.js")

router.get("/", traerUsuarios) 
router.post ("/auth",Login) 
router.get ("/:id",traerUnUsuario)
router.post ("/",crearUnUsuario) 
router.put ("/:id",actualizarUsuario ) 
router.delete("/:id", borrarUsuario)





module.exports= router