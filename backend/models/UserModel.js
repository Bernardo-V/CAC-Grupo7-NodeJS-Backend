const db = require ("../data/bd.js")
const { DataTypes } = require("sequelize")
const bcrypt = require('bcrypt');


const UsuarioModel = db.define ("usuarios",{
  idusuarios: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  nombre: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  apellido: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  mail: {
    type: DataTypes.STRING(45),
    allowNull: false,
    unique: true // Asegura que el correo electrónico sea único
  },
  password: {
    type: DataTypes.STRING(60), // Ajusta la longitud según tus necesidades
    allowNull: false,
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
}, {
  tableName: 'usuarios',
  timestamps: true // Habilita automáticamente los campos createdAt y updatedAt
},
  {
    hooks: {
      beforeCreate: async (user) => {
        const saltRounds = 10;
        user.password = await bcrypt.hash(user.password, saltRounds);
      },
      beforeUpdate: async (user) => {
        if (user.changed('password')) {
          const saltRounds = 10;
          user.password = await bcrypt.hash(user.password, saltRounds);
        }
      }
    }
  });

module.exports = UsuarioModel
