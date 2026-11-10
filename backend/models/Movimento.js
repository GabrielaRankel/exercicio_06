const {DataTypes} = require('sequelize')
const db = require('../db/conn')

const Movimento = db.define('movimento',{
    codMovimento: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    idProduto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: 'produtos',
            key: 'codProduto'
        }
    },
    tipo: {
        type: DataTypes.ENUM('ENTRADA','SAIDA'),
        allowNull: false
    },
    quantMovimentada: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    data: {
        type: DataTypes.DATEONLY,
        allowNull: false
    }
},{
    timestamps: true,
    tableName: 'movimentos'
})

module.exports = Movimento