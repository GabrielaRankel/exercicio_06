const Fornecedor = require('./Fornecedor')
const Produto = require('./Produto')
const Movimento = require('./Movimento')
const Funcionario = require('./Funcionario')

Fornecedor.hasMany(Produto,{
    foreignKey: 'idFornecedor',
    as: 'produtoFornecedor',
    onDelete: 'CASCADE'
})

Produto.belongsTo(Fornecedor,{
    foreignKey: 'idFornecedor',
    as: 'fornecedorProduto'
})

Movimento.belongsTo(Produto,{
    foreignKey: 'idProduto',
    as: 'produtomovimento'
})

Produto.hasMany(Movimento,{
    foreignKey: 'idProduto', 
    as: 'movimentoProduto',  
    onDelete: 'CASCADE'
})

module.exports = {Fornecedor, Produto, Movimento, Funcionario}