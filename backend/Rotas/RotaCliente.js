import { Router } from 'express';
import ClienteCtrl from '../Controle/ClienteCtrl.js'; 

// Estrutura a rota para cliente e recupera funções da ClienteCtrl
const clienteCtrl = new ClienteCtrl();
const rotaCliente = new Router();

// Define os metodos para a rota cliente
rotaCliente
.post('/', clienteCtrl.cadastrar)
.get('/', clienteCtrl.consultar)
.put('/', clienteCtrl.alterar)
.delete('/', clienteCtrl.excluir);

// rotaCliente.post('/associarProdutoCliente', clienteCtrl.associarProdutoCliente);
// rotaCliente.get('/consultarParaAlterar/:cod_cli', clienteCtrl.consultarParaAlterar);

export default rotaCliente;