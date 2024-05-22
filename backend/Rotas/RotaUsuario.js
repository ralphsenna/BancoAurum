import Router from 'express';
import UsuarioCtrl from '../Controle/UsuarioCtrl.js'; 

// Estrutura a rota para usuario e recupera funções da UsuarioCtrl
const rotaUsuario = new Router();
const usuarioCtrl = new UsuarioCtrl();

// Define os metodos para a rota usuario
rotaUsuario
.post('/', usuarioCtrl.cadastrar)
.post('/:termo', usuarioCtrl.cadastrarProduto)
.get('/', usuarioCtrl.consultar)
.get('/:termo', usuarioCtrl.consultar)
.put('/', usuarioCtrl.alterar)
.put('/:termo', usuarioCtrl.alterarProduto)
.delete('/', usuarioCtrl.excluir)
.delete('/:termo', usuarioCtrl.excluirProduto);

export default rotaUsuario;
