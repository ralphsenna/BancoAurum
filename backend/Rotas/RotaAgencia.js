import { Router } from 'express';
import AgenciaCtrl from '../Controle/AgenciaCtrl.js';

// Estrutura a rota para agencia e recupera funções da AgenciaCtrl
const agenciaCtrl = new AgenciaCtrl();
const rotaAgencia = new Router();

// Define os metodos para a rota agencia
rotaAgencia
.post('/', agenciaCtrl.cadastrar)
.get('/', agenciaCtrl.consultar)
.put('/', agenciaCtrl.alterar)
.delete('/', agenciaCtrl.excluir);

// .post('/associarProdutoAgencia', agenciaCtrl.associarProduto);
// .get('/consultarParaAlterar/:cod_ag', agenciaCtrl.consultarParaAlterar);

export default rotaAgencia;