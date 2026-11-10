const Produto = require('../models/Produto')
const cryptoJS = require('crypto-js')
const CHAVE_SECRETA = 'segredo'

const cadastrar = async (req, res) => {
    const valores = req.body

    if (!valores.idFornecedor || !valores.categoria || !valores.quantdadeEstoque || !valores.descricao || !valores.codigoLote) {
        return res.status(400).json({ message: 'Todos os campos são obrigatorios' })
    }

    try {
        const codigoLote = cryptoJS.AES.encrypt(valores.cpf, CHAVE_SECRETA).toString()

        await Produto.create({
            idFornecedor: valores.idFornecedor,
            categoria: valores.categoria,
            quantdadeEstoque: valores.quantdadeEstoque,
            descricao: valores.descricao,
            codigoLote: codigoLote

        })
        res.status(200).json({ message: 'dados cadastrados com sucesso' })
    }
    catch (err) {
        res.status(404).json({ message: 'Erro ao cadastrar' })
        console.error('Erro ao cadastrar', err)
    }
}



module.exports = {cadastrar}