import { Router } from 'express';
import { autenticar } from '../Seguranca/Autenticacao.js';

// Estrutura a rota para login
const rotaLogin = new Router();

// Define os metodos para a rota login
rotaLogin
.post('/', (req, resp) => {
    autenticar(req, resp);
});

export default rotaLogin;