const express = require('express')
const app = express()
const cors = require('cors')

const conn = require('./db/conn')
require('./models/rel')

const authMiddleware = require('./middleware/auth.middleware')
const authController = require('./controller/auth.controller')
const funcionarioController = require('./controller/funcionario.controller')
const movimentoController = require('./controller/movimento.controller')
const fornecedorController = require('./controller/fornecedor.controller')
const produtoController = require('./controller/produto.controller')

const hostname = 'localhost'
const PORT = 3000

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

app.post('/funcionario', funcionarioController.cadastrar)
app.post('/login', authController.login)

app.get('/',(req,res)=>{
    res.status(200).json({message: 'Aplicação Rodando'})
})

app.use(authMiddleware)

app.post('/fornecedor', fornecedorController.cadastrar)
app.get('/fornecedores', fornecedorController.listar)
app.get('/fornecedor/:id', fornecedorController.consultar)
app.get('/fornecedor/buscar/:nome', fornecedorController.consultarNome)
app.delete('/fornecedor/:id', fornecedorController.apagar)

app.post('/produto', produtoController.cadastrar)


app.post('/movimento', movimentoController.cadastrar)
app.get('/movimentos', movimentoController.listar)


conn.sync()
.then(()=>{
    app.listen(PORT, hostname, ()=>{
        console.log(`Servidor rodando em http://${hostname}:${PORT}`)
    })
})
.catch((err)=>{
    console.error('Erro de conexão no bamco de dados!', err)
})