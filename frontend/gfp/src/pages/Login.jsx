import { useNavigate, Link } from 'react-router-dom'; 
import { useState } from 'react'; 
import { enderecoServidor } from '../utils'; 

export default function Login () { 
    const navigate = useNavigate(); 

    
        const [email, setemail] = useState('')
        const [senha, setsenha] = useState('')
        const [mensagem, setmensagem] = useState('') 
        const [lembrar, setlembrar] = useState(false); 
    
        async function botaoEntrar(e) {
            e.preventDefault(); 
    
            try{
                if(email == '' || senha == ''){
                    throw new Error('Preencha todos os campos!');
                }  
                //Autenticando utilizando a API de backend com o fetch 
                const resposta = await fetch(`${enderecoServidor}/usuarios/login`, 
                    {
                        method: 'POST', 
                        headers: { 'Content-Type': 'application/json', "authorization": "Bearer" + localStorage.getItem('token') }, 
                        body: JSON.stringify({
                            email: email, 
                            senha: senha, 
                        })
                    }
                ) 
                if(!resposta.ok){
                    const dados = await resposta.json();
                    navigate('principal') 
                    localStorage.setItem('UsuarioLogado', JSON.stringify({...dados, lembrar})); 
                }else {
                    throw new Error('Email ou senha incorretos!'); 
                }
    
            } catch (error) {
                console.error('Erro ao realizar login:', error); 
                alert(error.message); 
                return; 
            }
        }  
    
    
    
        function botaoLimpar(){
            setemail('');
            setsenha('')
            setmensagem('');
        } 


    return( 
        <div> 
       <h1>GFP</h1>
            <p>Login</p>
            <p >Email</p>
            <input onChange={(e) => setemail(e.target.value)} value={email} type="text" placeholder="Digite seu Email"></input>
            <p>Senha</p>
            <input onChange={(e) => setsenha(e.target.value)} value={senha} type="text" placeholder="Digite sua Senha"></input>
            <br/>
            <p>{mensagem}</p> 

            <div className={Styles.between}>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <input type= "checkbox" style={{ marginRight: '5px'}}
                    checked={lembrar} onChange={(e) => setlembrar(e.target.checked)}/> 
                    <label>Lembrar-me</label> 
                </div>

            </div> 

            <button onClick={botaoEntrar} type="button" >Entrar</button>
            <button onClick={botaoLimpar} type="button" >Limpar</button>

        </div>
    ) 
} 