const cryptoJS = require('crypto-js')
const {JSON} = require('sequelize')
const CHAVE_SECRETA = 'segredo'

function authMiddleware(req,res,next){
    const token = req.headers['authorization']

    if(!token){
        return res.status(401).json({message: 'Acesso Negado! Faça o login'})
    }
    try{
        const bytes = cryptoJS.AES.decrypt(token, CHAVE_SECRETA)
        const dadosDescriptografados = bytes.toString(cryptoJS.enc.Utf8)

        if(!dadosDescriptografados){
            return res.status(403).json({message: 'Acesso proibido'})
        }
        const payload = JSON.parse(dadosDescriptografados)

        if(Date.now() > payload.expiraEm){
            res.status(401).json({message: 'Sessão Expirada! Faça login novamente!'})
        }

    }catch(err){
        res.status(500).json({message: 'ERRO'})
        console.error('ERRO',err)
    }
}

module.exports = authMiddleware