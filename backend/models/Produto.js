const {DataTypes} = require('sequelize')
const db = require('../db/conn')

const Produto = db.define('produto',{
    codProduto: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    idFornecedor: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: 'fornecedores',
            key: 'codFornecedor'
        }
    },
    categoria: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    descricao: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    quantEstoque: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    codigoLote: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
},{
    timestamps: true,
    tableName: 'produtos'
})

module.exports = Produto