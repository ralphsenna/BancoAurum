import Usuario from '../Modelo/Usuario.js';
import Agencia from '../Modelo/Agencia.js';

export default class UsuarioCtrl 
{
    // Chama a função cadastrar de Usuario para cadatrar e confirmar o cadastro
    cadastrar(req, resp) 
    {
        resp.type('application/json');
        if (req.method==='POST' && req.is('application/json')) 
        {
            const dados = req.body;
            const nome = dados.nome;
            const cpf = dados.cpf;
            const rg = dados.rg;
            const dataNasc = dados.dataNasc;
            const endereco = dados.endereco;
            const cidade = dados.cidade;
            const uf = dados.uf;
            const telefone = dados.telefone;
            const tipo = dados.tipo;
            const email = dados.email;
            const senha = dados.senha;
            const agencia = dados.agencia
            const objAgencia = new Agencia(agencia.cod_ag);
            if (nome && cpf && rg && dataNasc && endereco && cidade && uf && telefone && tipo && email && senha && agencia) 
            {
                const usuario = new Usuario(0, nome, cpf, rg, dataNasc, endereco, cidade, uf, telefone, tipo, email, senha, objAgencia);
                usuario.cadastrar().then(() => {
                    resp.status(201).json({
                        'status': true,
                        'codigoGerado': usuario.cod_usu,
                        'mensagem': 'Usuario cadastrado com sucesso!'
                    });
                })
                .catch((erro) => {
                    resp.status(500).json({
                        'status': false,
                        'mensagem': 'Erro ao cadastrar usuario: ' + erro.message
                    });
                });
            } 
            else 
            {
                resp.status(400).json({
                    'status': false,
                    'mensagem': 'Informe todos os dados do usuario: Nome, CPF, RG, Data de Nascimento, Endereço, Cidade, UF, Telefone, Tipo, E-mail, Senha e Agência.'
                });
            }
        } 
        else 
        {
            resp.status(400).json({
                'status': false,
                'mensagem': 'O método POST ou o usuario no formato JSON não foi fornecido. Consulte a documentação do projeto!'
            });
        }
    }

    // Chama a função consultar de Usuario para consultar e mostrar a consulta
    consultar(req, resp) 
    {
        resp.type('application/json');
        const paramConsulta = req.body;
        if (req.method==='GET') 
        {
            const usuario = new Usuario();
            usuario.consultar(paramConsulta).then((listaUsuarios) => {
                resp.status(200).json({
                    'status': true,
                    listaUsuarios
                });
            })
            .catch((erro) => {
                resp.status(500).json({
                    'status': false,
                    'mensagem': 'Erro ao obter usuarios: ' + erro.message
                });
            });
        } 
        else 
        {
            resp.status(400).json({
                'status': false,
                'mensagem': 'Por favor, utilize o método GET para consultar usuarios!'
            });
        }
    }

    // Chama a função alterar de Usuario para alterar e confirmar a alteração
    alterar(req, resp) 
    {
        resp.type('application/json');
        if (req.method==='PUT' && req.is('application/json')) 
        {
            const dados = req.body;
            const cod_usu = dados.cod_usu;
            const nome = dados.nome;
            const cpf = dados.cpf;
            const rg = dados.rg;
            const dataNasc = dados.dataNasc;
            const endereco = dados.endereco;
            const cidade = dados.cidade;
            const uf = dados.uf;
            const telefone = dados.telefone;
            const tipo = dados.tipo;
            const email = dados.email;
            const senha = dados.senha;
            const agencia = dados.agencia
            const objAgencia = new Agencia(agencia.cod_ag);
            if (cod_usu && nome && cpf && rg && dataNasc && endereco && cidade && uf && telefone && tipo && email && senha && agencia) 
            {
                const usuario = new Usuario(cod_usu, nome, cpf, rg, dataNasc, endereco, cidade, uf, telefone, tipo, email, senha, objAgencia);
                usuario.alterar().then(() => {
                    resp.status(200).json({
                        'status': true,
                        'mensagem': 'Usuario alterado com sucesso!'
                    });
                })
                .catch((erro) => {
                    resp.status(500).json({
                        'status': false,
                        'mensagem': 'Erro ao alterar usuario: ' + erro.message
                    });
                });
            } 
            else 
            {
                resp.status(400).json({
                    'status': false,
                    'mensagem': 'Informe o código e os novos dados possíveis de alteração do usuario: Nome, CPF, RG, Data de Nascimento, Endereço, Cidade, UF, Telefone, Tipo, E-mail, Senha e Agência.'
                });
            }
        } 
        else 
        {
            resp.status(400).json({
                'status': false,
                'mensagem': 'O método PUT ou o usuario no formato JSON não foi fornecido. Consulte a documentação do projeto!'
            });
        }
    }

    // Chama a função excluir de Usuario para excluir e confirmar a exclusão
    excluir(req, resp) 
    {
        resp.type('application/json');
        if (req.method==='DELETE' && req.is('application/json')) 
        {
            const dados = req.body;
            const cod_usu = dados.cod_usu;
            if (cod_usu)
            {
                const usuario = new Usuario(cod_usu);
                usuario.excluir().then(() => {
                    resp.status(200).json({
                        'status': true,
                        'mensagem': 'Usuario excluído com sucesso!'
                    });
                })
                .catch((erro) => {
                    resp.status(500).json({
                        'status': false,
                        'mensagem': 'Erro ao excluir usuario: ' + erro.message
                    });
                });
            } 
            else 
            {
                resp.status(400).json({
                    'status': false,
                    'mensagem': 'Informe o código do usuario a ser excluído!'
                });
            }
        } 
        else 
        {
            resp.status(400).json({
                'status': false,
                'mensagem': 'O método DELETE ou o código de usuario no formato JSON não foi fornecido. Consulte a documentação do projeto!'
            });
        }
    }
}
