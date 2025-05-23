import express from 'express'; 
import { testarConexao } from './db.js'; 
import cors from 'cors'; 
import rotasUsuarios, {autenticarToken} from './routes/rotasUsuarios.js';
import rotasCategorias from './routes/rotasCategorias.js';
import rotasSubcategorias from './routes/rotasSubcategorias.js'; 
import rotasContas from './routes/rotasContas.js'; 
import rotasTransacoes from './routes/rotasTransacoes.js'; 

import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger.js'; 

const app = express();
testarConexao();  

app.use(cors());
app.use(express.json()); 

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec)) 

app.get('/', (req, res) => {
    res.redirect('/api-docs');  
}) 

//Rotas Usuarios 
app.post('/usuarios', rotasUsuarios.Novousuario)
app.get('/usuarios', autenticarToken, rotasUsuarios.Listar)
app.get('/usuarios/:id', rotasUsuarios.ListarporID)
app.put('/usuarios/:id', rotasUsuarios.AtualizartodosCampos)
app.delete('/usuarios/:id', autenticarToken, rotasUsuarios.Deletar) 
app.patch('/usuarios/:id', autenticarToken, rotasUsuarios.Atualizar) 
app.post('/usuarios/login', rotasUsuarios.Login)


// Rotas categorias
app.post('/categorias',  rotasCategorias.novaCategoria) 
app.get('/categorias/filtrarCatageoria', rotasCategorias.filtrarCategoria) 
app.get('/categorias', rotasCategorias.listarTodas)
app.delete('/categorias/:id', rotasCategorias.Deletar)
app.put('/categorias/:id', rotasCategorias.atualizarTodosCampos)
app.patch('/categorias/:id', rotasCategorias.Atualizar)
app.get('/categorias/:id', rotasCategorias.ListarporID)


// Rotas subcategorias
app.post('/subcategorias', rotasSubcategorias.novaSubCategoria)
app.delete('/subcategorias/:id', rotasSubcategorias.deletarSubcategoria)
app.get('/subcategorias', rotasSubcategorias.listarSubcategorias)
app.get('/subcategorias/:id', rotasSubcategorias.ListarporID)
app.put('/subcategorias/:id', rotasSubcategorias.atualizartodosCampos)
app.patch('/subcategorias/:id', rotasSubcategorias.Atualizar)

// Rotas Contas
app.post('/contas', rotasContas.novaConta)
app.get('/contas', rotasContas.listarContas) 
app.get('/contas/:id', rotasContas.listarContaPorID) 
app.put('/contas/:id', rotasContas.atualizarTodasContas)
app.delete('/contas/:id', rotasContas.deletarConta) 

//Rotas Transações 
app.post('/transacoes', rotasTransacoes.novaTransacoes) 
app.get('/transacoes/somarTransacoes', rotasTransacoes.somarTransacoes)  
app.get('/transacao/filtroData', rotasTransacoes.filtrarPorData)
app.get('/transacao/transacoesVencidas/:id_usuario', rotasTransacoes.transacoesVencidas) 
app.get('/transacoes', rotasTransacoes.listarTransacoes) 
app.get('/transacoes/:id', rotasTransacoes.listarTransacoesPorID) 
app.patch('/transacoes/:id', rotasTransacoes.atualizarTransacoes) 
app.put('/transacoes/:id', rotasTransacoes.atualizarTodosTransacoes) 
app.delete('/transacoes/:id', rotasTransacoes.deletarTransacoes) 



const porta = 3000; 
app.listen(porta, () => { 
    console.log(`Api http://localhost:${porta}`) 
}) 


export default app; 