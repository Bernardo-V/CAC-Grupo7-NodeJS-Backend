const db = require ("../data/bd.js")
const { DataTypes } = require("sequelize")


const ComentarioModel = db.define ("comentarios",{
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  nombre: {
    type: DataTypes.STRING(30),
    allowNull: false
  },
  apellido: {
    type: DataTypes.STRING(30),
    allowNull: false
  },
  mail: {
    type: DataTypes.STRING(30),
    allowNull: false,
    unique: true // Asegura que el correo electrónico sea único
  },
  comentario: {
    type: DataTypes.TEXT, // Ajusta la longitud según tus necesidades
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null,
    field: 'createdAt' // Esta opción indica a Sequelize que use 'created_at' en lugar de 'createdAt'
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null,
    field: 'updatedAt' // Esta opción indica a Sequelize que use 'updated_at' en lugar de 'updatedAt'
  }
});

module.exports = ComentarioModel
