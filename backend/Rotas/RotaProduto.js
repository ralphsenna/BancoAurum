import { Router } from 'express';
import ProdutoCtrl from '../Controle/ProdutoCtrl.js';

// Estrutura a rota para produto e recupera funções da ProdutoCtrl
const produtoCtrl = new ProdutoCtrl();
const rotaProduto = new Router();

// Define os metodos para a rota produto
rotaProduto
.post('/', produtoCtrl.cadastrar)
.get('/', produtoCtrl.consultar)
.put('/', produtoCtrl.alterar)
.delete('/', produtoCtrl.excluir);

export default rotaProduto;