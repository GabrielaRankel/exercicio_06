const Funcionario = require('../models/Funcionario')
const cryptoJS = require('crypto-js')
const CHAVE_SECRETA = 'segredo'

const login = async (req, res) => {
    const valores = req.body

    if (!valores.email || !valores.senha) {
        return res.status(400).json({ message: 'Informe o e-mail e a senha' })
    }

    try {
        const funcionario = await Funcionario.findOne({ where: { email: valores.email } })
        
        if (!funcionario) {
            return res.status(404).json({ message: 'Funcionario não encontrado, confira o email ou senha' })
        }

        const bytes = cryptoJS.AES.decrypt(funcionario.senha, CHAVE_SECRETA)
        const senhaDescripto = bytes.toString(cryptoJS.enc.Utf8)

        if (valores.senha !== senhaDescripto) {
            return res.status(401).json({ message: 'Senha incorreta!' })
        }

        const quatroHoras = 4 * 60 * 60 * 1000
        const tempoExpiracao = Date.now() + quatroHoras

        const payload = {
            idFuncionario: funcionario.codFuncionario,
            nome: funcionario.nome,
            expieraEm: tempoExpiracao
        }

        const token = cryptoJS.AES.encrypt(JSON.stringify(payload), CHAVE_SECRETA).toString()

        // Corrigido: res.status correto
        return res.status(200).json({
            message: 'Login realizado com sucesso!',
            token: token,
            nome: funcionario.nome
        })

    } catch (err) {
        console.error('Erro ao fazer login', err)
        return res.status(500).json({ message: 'Erro ao realizar o login' })
    }
}

module.exports = { login }