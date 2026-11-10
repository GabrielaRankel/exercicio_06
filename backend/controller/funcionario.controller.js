const Funcionario = require('../models/Funcionario')
const cryptoJS = require('crypto-js')
const CHAVE_SECRETA = 'segredo'

const cadastrar = async (req, res) => {
    const valores = req.body

    if (!valores.nome || !valores.senha || !valores.email) {
        return res.status(400).json({ message: 'Todos os campos são obrigatorios' })
    }

    try {
        const senhaCriptografada = cryptoJS.AES.encrypt(valores.senha, CHAVE_SECRETA).toString()

        await Funcionario.create({
            nome: valores.nome,
            senha: senhaCriptografada,
            email: valores.email
        })

        res.status(200).json({ message: 'dados cadastrados com sucesso' })
    }
    catch (err) {
        res.status(500).json({ message: 'Erro ao cadastrar' })
        console.error('Erro ao cadastrar', err)
    }
}

module.exports = {cadastrar}