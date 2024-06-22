const express = require("express");
const app = express();
const viajesRouter = require("./routes/paquetesRouter.js")
const path = require('path');

const usuariosRouter = require("./routes/userRouter.js")

const db = require ("./data/bd.js")


const PORT = process.env.PORT || 3001;
app.use("/viajes", viajesRouter)
app.use ("/usuarios",usuariosRouter)



app.use(express.static(path.join(__dirname, '../frontend/public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/public/views/index.html'));
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