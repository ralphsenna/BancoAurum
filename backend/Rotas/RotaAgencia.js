import { Router } from 'express';
import AgenciaCtrl from '../Controle/AgenciaCtrl.js';

// Estrutura a rota para agencia e recupera funções da AgenciaCtrl
const rotaAgencia = new Router();
const agenciaCtrl = new AgenciaCtrl();

// Define os metodos para a rota agencia
rotaAgencia
.post('/', agenciaCtrl.cadastrar)
.get('/', agenciaCtrl.consultar)
.put('/', agenciaCtrl.alterar)
.delete('/', agenciaCtrl.excluir);

export default rotaAgencia;
