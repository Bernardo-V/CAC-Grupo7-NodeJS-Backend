const express = require ("express")
const router = express.Router()
const path = require('path');

router.use(express.json()); // Middleware para parsear el cuerpo de la solicitud como JSON

const {crearUnDestino,traerDestinos,traerUnDestino,actualizarDestino,borrarDestino } = require ("../controllers/destinosControllers.js")

router.get("/", traerDestinos) 
/* router.post ("/auth",Login)  */
router.get ("/:id",traerUnDestino)
router.post ("/",crearUnDestino) 
router.put ("/:id",actualizarDestino ) 
router.delete("/:id", borrarDestino)





module.exports= router