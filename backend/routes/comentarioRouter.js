const express = require ("express")
const router = express.Router()
const path = require('path');

router.use(express.json()); // Middleware para parsear el cuerpo de la solicitud como JSON



const {crearUnComentario, traerComentarios} = require ("../controllers/comentarioController.js")

router.get("/", traerComentarios) 
router.post ("/",crearUnComentario) 

module.exports= router