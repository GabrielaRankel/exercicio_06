// const { where } = require('sequelize')
const Fornecedor = require('../models/Fornecedor')
const cryptoJS = require('crypto-js')
const CHAVE_SECRETA = 'segredo'

const cadastrar = async (req, res) => {
    const valores = req.body

    if (!valores.nome || !valores.cpf || !valores.cnpj) {
        return res.status(400).json({ message: 'Todos os campos são obrigatorios' })
    }

    try {
        const cpfCriptografado = cryptoJS.AES.encrypt(valores.cpf, CHAVE_SECRETA).toString()
        const cnpjCriptografado = cryptoJS.AES.encrypt(valores.cnpj, CHAVE_SECRETA).toString()

        await Fornecedor.create({
            nome: valores.nome,
            cpf: cpfCriptografado,
            cnpj: cnpjCriptografado

        })

        res.status(200).json({ message: 'dados cadastrados com sucesso' })
    }
    catch (err) {
        res.status(404).json({ message: 'Erro ao cadastrar' })
        console.error('Erro ao cadastrar', err)
    }
}

const listar = async (req, res) => {
    try {
        const fornecedores = await Fornecedor.findAll()
        let resultado = []
        let cpfDescriptografado = ` `
        let cnpjDescriptografado = ` `

        fornecedores.forEach((el) => {
            try {
                let bytes = cryptoJS.AES.decrypt(el.cpf, CHAVE_SECRETA)
                cpfDescriptografado = bytes.toString(cryptoJS.enc.Utf8)
                let bytes2 = cryptoJS.AES.decrypt(el.cpf, CHAVE_SECRETA)
                cnpjDescriptografado = bytes2.toString(cryptoJS.enc.Utf8)
            } catch (err) {
                cpfDescriptografado = 'Erro ao descriptografar'
                console.error(cpfDescriptografado, err)
                cnpjDescriptografado = 'Erro ao descriptografar'
                console.error(cnpjDescriptografado, err)
            }
            resultado.push({
                codFornecedor: el.codFornecedor,
                nome: el.nome,
                cpf: cpfDescriptografado,
                cnpj: cnpjDescriptografado
            })
        })
        console.log(resultado)
        return res.status(200).json(resultado)
    } catch (err) {
        console.error('Não foi possível listar', err)
        res.status(500).json({ message: 'Não foi possível listar' })
    }
}

const consultar = async(req,res)=>{
    const id = req.params.id
    
    try {
        const fornecedores = await Fornecedor.findByPk(id)
        if (!fornecedores) {
            return res.status(404).json({ message: 'fornecedor não encontrado!' })
        }
        let resultado = []
        let cpfDescriptografado = ` `
        let cnpjDescriptografado = ` `

        fornecedores.forEach((el) => {
            try {
                let bytes = cryptoJS.AES.decrypt(el.cpf, CHAVE_SECRETA)
                cpfDescriptografado = bytes.toString(cryptoJS.enc.Utf8)
                let bytes2 = cryptoJS.AES.decrypt(el.cpf, CHAVE_SECRETA)
                cnpjDescriptografado = bytes2.toString(cryptoJS.enc.Utf8)
            } catch (err) {
                cpfDescriptografado = 'Erro ao descriptografar'
                console.error(cpfDescriptografado, err)
                cnpjDescriptografado = 'Erro ao descriptografar'
                console.error(cnpjDescriptografado, err)
            }
            resultado.push({
                codFornecedor: el.codFornecedor,
                nome: el.nome,
                cpf: cpfDescriptografado,
                cnpj: cnpjDescriptografado
            })
        })
        console.log(resultado)
        return res.status(200).json(resultado)
    } catch (err) {
        console.error('Não foi possível consultar', err)
        res.status(500).json({ message: 'Não foi possível consultar' })
    }
}


const consultarNome = async(req,res)=>{
    const nome = req.params.nome
    
    try {
        const fornecedores = await Fornecedor.findOne({where: {nome: nome}})
        if (!fornecedores) {
            return res.status(404).json({ message: 'fornecedor não encontrado!' })
        }
        let resultado = []
        let cpfDescriptografado = ` `
        let cnpjDescriptografado = ` `

        fornecedores.forEach((el) => {
            try {
                let bytes = cryptoJS.AES.decrypt(el.cpf, CHAVE_SECRETA)
                cpfDescriptografado = bytes.toString(cryptoJS.enc.Utf8)
                let bytes2 = cryptoJS.AES.decrypt(el.cpf, CHAVE_SECRETA)
                cnpjDescriptografado = bytes2.toString(cryptoJS.enc.Utf8)
            } catch (err) {
                cpfDescriptografado = 'Erro ao descriptografar'
                console.error(cpfDescriptografado, err)
                cnpjDescriptografado = 'Erro ao descriptografar'
                console.error(cnpjDescriptografado, err)
            }
            resultado.push({
                codFornecedor: el.codFornecedor,
                nome: el.nome,
                cpf: cpfDescriptografado,
                cnpj: cnpjDescriptografado
            })
        })
        console.log(resultado)
        return res.status(200).json(resultado)
    } catch (err) {
        console.error('Não foi possível consultar', err)
        res.status(500).json({ message: 'Não foi possível consultar' })
    }
}

const apagar = async(req,res)=>{
    const id = req.params.id
    
    try {
        const fornecedores = await Fornecedor.findByPk(id)
        if (!fornecedores) {
            return res.status(404).json({ message: 'fornecedor não encontrado!' })
        }
        await fornecedores.destroy({where: {codFornecedor: id}})
        return res.status(200).json({message: 'Fornecedor apagado com sucesso '})
    } catch (err) {
        console.error('Não foi possível consultar', err)
        res.status(500).json({ message: 'Não foi possível consultar' })
    }
}

module.exports = { cadastrar, listar, consultar, consultarNome,  apagar }