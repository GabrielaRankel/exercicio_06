const Movimento = require('../models/Movimento')
const cryptoJS = require('crypto-js')
const CHAVE_SECRETA = 'segredo'

const cadastrar = async(req,res)=>{
    const valores = req.body

    if(!valores.idProduto || !valores.tipo || !valores.quantMovimentada || !valores.data){
        return res.status(400).json({message: 'Todos os campos são obrigatorios'})
    }
    try{
        await Movimento.create(valores)
        res.status(200).json({message: 'dados cadastrados com sucesso'})
    }
    catch(err){
        res.status(404).json({message: 'Erro ao cadastrar'})
        console.error('Erro ao cadastrar', err)
    }
}

const listar = async(req,res)=>{
    try{
        const movimentos = await Movimento.findAll()
        res.status(200).json(movimentos)
    }
    catch(err){
        res.status(404).json({message: 'Erro ao listar'})
        console.error('Erro ao listar', err)
    }
}

module.exports = {cadastrar, listar}