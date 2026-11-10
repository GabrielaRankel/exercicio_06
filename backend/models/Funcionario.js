const {DataTypes} = require('sequelize')
const db = require('../db/conn')

const Funcionario = db.define('funcionario',{
    codFuncionario: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false
    },
    senha: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
},{
    timestamps: true,
    tableName: 'funcionarios'
})

module.exports = Funcionario