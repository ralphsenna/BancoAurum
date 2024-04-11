import { Router } from 'express';
import UsuarioCtrl from '../Controle/UsuarioCtrl.js'; 

// Estrutura a rota para usuario e recupera funções da UsuarioCtrl
const rotaUsuario = new Router();
const usuarioCtrl = new UsuarioCtrl();

// Define os metodos para a rota usuario
rotaUsuario
.post('/', usuarioCtrl.cadastrar)
.get('/', usuarioCtrl.consultar)
.put('/', usuarioCtrl.alterar)
.delete('/', usuarioCtrl.excluir);

export default rotaUsuario;
