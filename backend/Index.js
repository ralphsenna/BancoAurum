import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import session from 'express-session';
//import rotaLogin from './Rotas/RotaLogin.js';
import rotaUsuario from './Rotas/RotaUsuario.js';
import rotaAgencia from './Rotas/RotaAgencia.js';
import rotaProduto from './Rotas/RotaProduto.js';
//import verificarAcesso from './Seguranca/Autenticacao.js';

// Configuração do dotenv (Mascarar variáveis de ambiente)
dotenv.config();

// Criação e configurações do servidor
const app = express();
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(session({
	secret: process.env.SEGREDO,
	resave: false,
	saveUninitialized: true,
	maxAge: 1000*60*60
}));

// Rotas para o servidor
//app.use('/login', rotaLogin);
app.use('/agencia', /*verificarAcesso, */rotaAgencia);
app.use('/usuario', /* verificarAcesso,  */rotaUsuario);
app.use('/produto', /* verificarAcesso,  */rotaProduto);

// Inicialização do servidor
const host = '0.0.0.0';
const porta = '4000';
app.listen(porta, host, () => {
	console.log('Servidor escutando na porta '+ host +':'+ porta);
});
