import jwt from 'jsonwebtoken';

// Função para assinar o token
export function assinar(usuario)
{
  	const token = jwt.sign({usuario}, process.env.SEGREDO, {expiresIn: '1h'});
	return token;
}

// Função para verificar a assinatura do token
export function verificarAssinatura(token) 
{
  	return jwt.verify(token, process.env.SEGREDO);
}