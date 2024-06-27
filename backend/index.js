const express = require("express");
const app = express();
const cors = require ("cors")
// const viajesRouter = require("./routes/paquetesRouter.js")
const path = require('path');
require('dotenv').config();

const paquetesRouter = require("./routes/paquetesRouter.js")
const usuariosRouter = require("./routes/userRouter.js")
const authenticate = require('./middleware/authenticate.js'); // Importa el middleware de autenticación


const db = require ("./data/bd.js");
app.use(cors());


const PORT = process.env.PORT || 3001;

// app.use("/viajes", viajesRouter)
app.use("/paquetes", paquetesRouter)
app.use ("/usuarios",usuariosRouter)



app.use(express.static(path.join(__dirname, '../frontend/public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/public/views/index.html'));
});

app.get("/miperfil", authenticate.soloAdmin);



app.get('/patagonia', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/public/views/patagonia.html'));
});

app.get('/norte', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/public/views/norte.html'));
});
app.get('/nosotros', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/public/views/nosotros.html'));
});
app.get('/contacto', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/public/views/contacto.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/public/views/login.html'));
});

//conexion a la base de datos
const conexionDB = async ()=>{
    try {
       await db.authenticate()
       console.log(`conectado ok a la base de datos`);
    } catch (error) {
        console.log(`el error es : ${error}`);
    }
}

app.listen (PORT,()=>{
    conexionDB()
    console.log(`servidor OK : http://localhost:${PORT}`);
})