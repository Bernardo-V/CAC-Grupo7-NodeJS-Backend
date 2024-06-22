const {Sequelize} = require ("sequelize")


/* nombre de la base datos - user - contraseña - {donde esta alojada la bd?, lenguaje,puerto} */
const db = new Sequelize ("viajar2024","root","1234",{
    host: "localhost",
    dialect: "mysql",
    port:3307
})
module.exports = db