import Usuario from '../Modelo/Usuario.js';
import Agencia from '../Modelo/Agencia.js';

export default class UsuarioCtrl 
{
    // Chama a função cadastrarBD de Usuario para cadatrar e confirmar o cadastro
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
            const email = dados.email;
            const telefone = dados.telefone;
            const agencia = dados.agencia
            const objAgencia = new Agencia(agencia);
            if (nome && cpf && rg && dataNasc && endereco && cidade && uf && email && telefone && agencia) 
            {
                const usuario = new Usuario(0, nome, cpf, rg, dataNasc, endereco, cidade, uf, email, telefone, objAgencia);
                usuario.cadastrarBD().then(() => {
                    resp.status(201).json({
                        "status": true,
                        "codigoGerado": usuario.cod_usu,
                        "mensagem": 'Usuario cadastrado com sucesso!'
                    });
                })
                .catch((erro) => {
                    resp.status(500).json({
                        "status": false,
                        "mensagem": 'Erro ao cadastrar usuario: ' + erro.message
                    });
                });
            } 
            else 
            {
                resp.status(400).json({
                    "status": false,
                    "mensagem": 'Informe todos os dados do usuario: Nome, CPF, RG, Data de Nascimento, Endereço, Cidade, UF, E-mail, Telefone e Agência.'
                });
            }
        } 
        else 
        {
            resp.status(400).json({
                "status": false,
                "mensagem": 'O método POST ou o usuario no formato JSON não foi fornecido. Consulte a documentação do projeto!'
            });
        }
    }

    // Chama a função consultarBD de Usuario para consultar e mostrar a consulta
    consultar(req, resp) 
    {
        resp.type('application/json');
        const paramConsulta = req.body;
        if (req.method==='GET') 
        {
            const usuario = new Usuario();
            usuario.consultarBD(paramConsulta).then((listaUsuarios) => {
                resp.status(200).json({
                    "status": true,
                    listaUsuarios
                });
            })
            .catch((erro) => {
                resp.status(500).json({
                    "status": false,
                    "mensagem": 'Erro ao obter usuarios: ' + erro.message
                });
            });
        } 
        else 
        {
            resp.status(400).json({
                "status": false,
                "mensagem": 'Por favor, utilize o método GET para consultar usuarios!'
            });
        }
    }

    // Chama a função alterarBD de Usuario para alterar e confirmar a alteração
    alterar(req, resp) 
    {
        resp.type('application/json');
        if (req.method==='PUT' && req.is('application/json')) 
        {
            const dados = req.body;
            const cod_usu = dados.cod_usu;
            const endereco = dados.endereco;
            const cidade = dados.cidade;
            const uf = dados.uf;
            const email = dados.email;
            const telefone = dados.telefone;
            const agencia = dados.agencia;
            const objAgencia = new Agencia(agencia);
            if (endereco && cidade && uf && email && telefone && agencia) 
            {
                const usuario = new Usuario(cod_usu, '', '', '', '', endereco, cidade, uf, email, telefone, objAgencia);
                usuario.alterarBD().then(() => {
                    resp.status(200).json({
                        "status": true,
                        "mensagem": 'Usuario alterado com sucesso!'
                    });
                })
                .catch((erro) => {
                    resp.status(500).json({
                        "status": false,
                        "mensagem": 'Erro ao alterar usuario: ' + erro.message
                    });
                });
            } 
            else 
            {
                resp.status(400).json({
                    "status": false,
                    "mensagem": 'Informe o código e os novos dados possíveis de alteração do usuario: Endereço, Cidade, UF, E-mail, Telefone e Agência.'
                });
            }
        } 
        else 
        {
            resp.status(400).json({
                "status": false,
                "mensagem": 'O método PUT ou o usuario no formato JSON não foi fornecido. Consulte a documentação do projeto!'
            });
        }
    }

    // Chama a função excluirBD de Usuario para excluir e confirmar a exclusão
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
                usuario.excluirBD().then(() => {
                    resp.status(200).json({
                        "status": true,
                        "mensagem": 'Usuario excluído com sucesso!'
                    });
                })
                .catch((erro) => {
                    resp.status(500).json({
                        "status": false,
                        "mensagem": 'Erro ao excluir usuario: ' + erro.message
                    });
                });
            } 
            else 
            {
                resp.status(400).json({
                    "status": false,
                    "mensagem": 'Informe o código do usuario a ser excluído!'
                });
            }
        } 
        else 
        {
            resp.status(400).json({
                "status": false,
                "mensagem": 'O método DELETE ou o código de usuario no formato JSON não foi fornecido. Consulte a documentação do projeto!'
            });
        }
    }

    /* // CONSULTAR PARA ALTERAR USUARIO
    consultarParaAlterar(req, resp) {
        resp.type('application/json');

        if (req.method === 'GET') {
            const cod_usu = req.params.cod_usu;
            const usuario = new Usuario();
            // // método assíncrono consultar da camada de persistência
            usuario
                .consultarBD(cod_usu)
                .then((usuarios) => {
                    resp.status(200).json(usuarios);
                })
                .catch((erro) => {
                    resp.status(500).json({
                        status: false,
                        msg: erro.message,
                    });
                });
        } else {
            resp.status(400).json({
                status: false,
                msg: 'O método não é permitido! Consulte a documentação da API!',
            });
        }
    }

    // ASSOCIAR PRODUTO A USUARIO
    associarProdutoUsuario(req, resp) {
        resp.type('application/json');
        if (req.method === 'POST' && req.is('application/json')) {
            const dados = req.body;
            const cod_usu = dados.cod_usu;
            const cod_prod = dados.cod_prod;

            if (cod_usu && cod_prod) {
                // CRIAR MODELO USUPROD
                const usuario_produto = new UsuarioProduto(cod_usu, cod_prod);
                // console.log('Agência cadastrada (endereço) / cidade:', agencia.endereco, agencia.cidade);

                usuario_produto
                    .cadastrarBD()
                    .then(() => {
                        resp.status(200).json({
                            status: true,
                            cod_ag: agencia.cod_ag, //nao retirar
                            msg: 'Agência criada com sucesso!',
                        });
                    })
                    .catch((erro) => {
                        resp.status(500).json({
                            status: false,
                            msg: erro.message,
                        });
                    });
            } else {
                resp.status(400).json({
                    status: false,
                    msg: 'Informe todos os dados da agência: endereço e cidade ',
                });
            }
        } else {
            resp.status(400).json({
                status: false,
                msg: 'O método não é permitido ou agência no formato JSON não foi fornecida. Consulte a documentação da API!',
            });
        }
    }*/
}
