const conn = require('./db/conn')
const {Fornecedor, Produto, Movimento, Funcionario} = require('./models/rel')

async function SyncDataBase() {
    try{
        await conn.sync({force: true})
        console.log('SINCRONIZANDO')
    }catch(err){
        console.error('Erro ao sincronizar essa PORRA')
    }finally{
        await conn.close()
        console.log('Fechando a conexão')
    }
}

SyncDataBase()