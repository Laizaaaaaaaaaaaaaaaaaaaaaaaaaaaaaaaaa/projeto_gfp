import pkg from 'pg';
import dotenv from 'dotenv'; 

const { Pool } = pkg;
dotenv.config()


//const BD = new Pool ({
 // connectionString: "postgres://postgres.qwcpspacpchblmdkdnpw:1hLiKxw9iK2hjjxI@aws-0-us-east-1.pooler.supabase.com:5432/postgres",
//  ssl:{
 //   rejectUnauthorized: false 
 // }
//})

 const BD = new Pool({
  user: 'postgres',
  host: 'localhost', 
  database: 'bd_gfp', 
  password: 'admin', 
  port: 5432, 

})
const testarConexao = async () => { 
    try {
      const client = await BD.connect();//tenta estabelecer a conexão com o banco de dados 
      console.log("Conexao com o banco de dados estabelecida ");
      client.release();// libera o client 
    } catch (error) 
    {
       console.log("Erro ao conectar ao banco de dados", error.message)
    }
}

export { BD, testarConexao }; 