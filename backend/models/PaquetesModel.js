const db = require ("../data/bd.js")

const {DataTypes} = require ("sequelize")

const PaquetesModel = db.define ("paquetes",{
    idpaquetes: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  titulo_paquete: {
    type: DataTypes.STRING(45),
    allowNull: true,
    defaultValue: null,
    collate: 'utf8mb3_bin'
  },
  descripcion_paquete: {
    type: DataTypes.STRING(350),
    allowNull: true,
    defaultValue: null,
    charset: 'utf8mb3'
  },
  img_paquete: {
    type: DataTypes.STRING(150),
    allowNull: true,
    defaultValue: null,
    charset: 'utf8mb3'
  },
  precio_paquete: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null
  },
  dias_paquete: {
    type: DataTypes.STRING(45),
    allowNull: true,
    defaultValue: null,
    collate: 'utf8mb3_bin'
  },
  destino_paquete: {
    type: DataTypes.STRING(45),
    allowNull: true,
    defaultValue: null,
    collate: 'utf8mb3_bin'
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
  },
  id_destinos: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null
  }
}, {
  tableName: 'paquetes',
  timestamps: true, // Esto gestionará automáticamente los campos createdAt y updatedAt
  underscored: true // Si tus nombres de columnas tienen guiones bajos, esto ayudará a que sequelize los maneje correctamente
});

module.exports = PaquetesModel