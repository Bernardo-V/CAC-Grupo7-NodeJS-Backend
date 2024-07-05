const db = require ("../data/bd.js")
const { DataTypes } = require("sequelize")
const bcrypt = require('bcrypt');


const DestinosModel = db.define ("destinos",{
  iddestinos: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  titulo_destino: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  descripcion_destino: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  region_destino: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  ciudad: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  provincia: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  pais: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  img_destino: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
/*   mail: {
    type: DataTypes.STRING(45),
    allowNull: false,
    unique: true // Asegura que el correo electrónico sea único
  }, */
/*   password: {
    type: DataTypes.STRING(60), // Ajusta la longitud según tus necesidades
    allowNull: false,
  },
    superUsu: {
    type: DataTypes.TINYINT(1), // Ajusta la longitud según tus necesidades
    allowNull: false,
  }, */
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
  tableName: 'destinos',
  timestamps: true // Habilita automáticamente los campos createdAt y updatedAt
},
  {
/*     hooks: {
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
    } */
  });

module.exports = DestinosModel