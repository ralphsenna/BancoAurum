import Router from 'express';
import AgenciaCtrl from '../Controle/AgenciaCtrl.js';

// Estrutura a rota para agencia e recupera funções da AgenciaCtrl
const rotaAgencia = new Router();
const agenciaCtrl = new AgenciaCtrl();

// Define os metodos para a rota agencia
rotaAgencia
.post('/', agenciaCtrl.cadastrar)
.post('/:termo', agenciaCtrl.cadastrarProduto)
.get('/', agenciaCtrl.consultar)
.get('/:termo', agenciaCtrl.consultar)
.put('/', agenciaCtrl.alterar)
.put('/:termo', agenciaCtrl.alterarProduto)
.delete('/', agenciaCtrl.excluir)
.delete('/:termo', agenciaCtrl.excluirProduto);

export default rotaAgencia;
