import express from 'express'; 
import { testarConexao } from './db.js'; 
import cors from 'cors'; 
import rotasUsuarios, {autenticarToken} from './routes/rotasUsuarios.js';
import rotasCategorias from './routes/rotasCategorias.js';
import rotasSubcategorias from './routes/rotasSubcategorias.js'; 
const app = express();
testarConexao();  

app.use(cors());
app.use(express.json()); 

app.get('/', (req, res) => {
    res.send('Api Funcionando!');  
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

// Rotas Local Transações 
//app.post('/localtransacoes', rotasUsuarios.NovoLocalTransacao) 




const porta = 3000; 
app.listen(porta, () => { 
    console.log(`Api http://localhost:${porta}`) 
}) 


export default app; 