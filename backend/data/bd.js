const {Sequelize} = require ("sequelize")
require('dotenv').config();


/* nombre de la base datos - user - contraseña - {donde esta alojada la bd?, lenguaje,puerto} */
 /*const db = new Sequelize ("viajar2024","root","Yanina_2023",{
     host: "localhost",
     dialect: "mysql",
     port:3306
 })*/

 const db = new Sequelize ("viaja2024_viajar2024",process.env.DB_USER,process.env.DB_PASSWORD,{
    host: process.env.DB_HOST,
    dialect: "mysql",
    port:3306
}) 

module.exports = db

// INSERT INTO `usuarios` (`idusuarios`, `nombre`, `apellido`, `mail`, `password`, `createdAt`, `updatedAt`) VALUES (NULL, 'carolina', 'mendez', 'c@o.com', '111', NULL, NULL);