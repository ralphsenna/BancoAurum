import { assinar, verificarAssinatura } from './FuncoesJWT.js';

// Função para autenticar o usuário
export function autenticar(requisicao, resposta) 
{
	const usuario = requisicao.body.usuario;
	const senha = requisicao.body.senha;
	if (usuario === 'admin' && senha === 'admin') 
	{
		requisicao.session.usuarioAutenticado = usuario;
		resposta.json({
			"status": true,
			"token": assinar({usuario})
		});
	} 
	else 
	{
		requisicao.session.usuarioAutenticado = null;
		resposta.status(401).json({
			"status": false,
			"mensagem": 'Usuário ou senha inválidos!'
		});
	}
}

// Função para verificar o acesso
export function verificarAcesso(requisicao, resposta, next) 
{
	const token = requisicao.headers['authorization'];
	let tokenDecodificado = '';
	try 
	{
		if (token) 
		{
			tokenDecodificado = verificarAssinatura(token);
		}
		if (tokenDecodificado.usuario.usuario == requisicao.session.usuarioAutenticado) 
		{
			next();
		}
		else 
		{
			resposta.status(401).json({
				"status": false,
				"mensagem": "Acesso não autorizado. Faça o login na aplicação!"
			});
		}
	} 
	catch 
	{
		console.log("Erro ao decodificar token");
		resposta.status(401).json({
			"status": false,
			"mensagem": "Acesso não autorizado. Faça o login na aplicação!"
		});
	}
}
