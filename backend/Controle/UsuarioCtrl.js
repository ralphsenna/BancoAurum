import Usuario from '../Modelo/Usuario.js';
import Produto from '../Modelo/Produto.js';
import UsuarioProduto from '../Modelo/UsuarioProduto.js';

export default class UsuarioCtrl 
{
    // Chama a função cadastrar de Usuario para cadatrar e efetivar o cadastro
    cadastrar(req, resp) 
    {
        resp.type('application/json');
        if (req.method==='POST' && req.is('application/json')) 
        {
            const dados = req.body;
            if (dados.tipo && dados.nome && dados.cpf && dados.rg && dados.genero && dados.telefone && dados.data_nascimento && 
                dados.cep && dados.endereco && dados.cidade && dados.uf && dados.email && dados.senha && dados.agencia)
            {
                const usuario = new Usuario(0, dados.tipo, dados.nome, dados.cpf, dados.rg, dados.genero, dados.telefone,
                                            dados.data_nascimento, dados.cep, dados.endereco, dados.cidade, dados.uf, 
                                            dados.email, dados.senha, dados.agencia);
                usuario.cadastrar().then(() => {
                    resp.status(201).json({
                        status: true,
                        codigo_gerado: usuario.codigo,
                        mensagem: 'Usuário cadastrado com sucesso!'
                    });
                })
                .catch((erro) => {
                    resp.status(500).json({
                        status: false,
                        mensagem: 'Erro ao cadastrar usuário: ' + erro.message
                    });
                });
            } 
            else 
            {
                resp.status(400).json({
                    status: false,
                    mensagem: 'Informe todos os dados do usuário!'
                });
            }
        } 
        else 
        {
            resp.status(400).json({
                status: false,
                mensagem: 'O método POST ou o usuário no formato JSON não foi fornecido.'
            });
        }
    }

    // Chama a função cadastrarProduto de UsuarioProduto para cadatrar e efetivar o cadastro
    cadastrarProduto(req, resp)
    {
        resp.type('application/json');
        if (req.method==='POST' && req.is('application/json')) 
        {
            const dados = req.body;
            if (dados.usuario && dados.produto && dados.data_contratacao)
            {
                const usuarioProduto = new UsuarioProduto(dados.usuario, dados.produto, dados.data_contratacao, dados.saldo, dados.valor_final);
                usuarioProduto.cadastrar().then(() => {
                    resp.status(201).json({
                        status: true,
                        codigo_gerado: usuarioProduto.produto.codigo,
                        mensagem: 'Produto cadastrado no usuário com sucesso!'
                    });
                })
                .catch((erro) => {
                    resp.status(500).json({
                        status: false,
                        mensagem: 'Erro ao cadastrar produto no usuário: ' + erro.message
                    });
                });
            } 
            else 
            {
                resp.status(400).json({
                    status: false,
                    mensagem: 'Informe todos os dados do usuário e do produto!'
                });
            }
        } 
        else 
        {
            resp.status(400).json({
                status: false,
                mensagem: 'O método POST ou a classe no formato JSON não foi fornecido.'
            });
        }
    }

    // Chama a função consultar de Usuario para consultar e mostrar os usuarios
    consultar(req, resp) 
    {
        const termo = req.params.termo ? req.params.termo : '';
        resp.type('application/json');
        if (req.method==='GET') 
        {
            const usuario = new Usuario();
            if (isNaN(parseInt(termo)))
            {
                usuario.consultar(termo).then((listaUsuarios) => {
                    resp.status(200).json({
                        status: true,
                        listaUsuarios
                    });
                })
                .catch((erro) => {
                    resp.status(500).json({
                        status: false,
                        mensagem: 'Erro ao obter usuários: ' + erro.message
                    });
                });
            }
            else
            {
                usuario.consultar(termo).then((listaProdutos) => {
                    resp.status(200).json({
                        status: true,
                        listaProdutos
                    });
                })
                .catch((erro) => {
                    resp.status(500).json({
                        status: false,
                        mensagem: 'Erro ao obter produtos: ' + erro.message
                    });
                });
            }
        } 
        else 
        {
            resp.status(400).json({
                status: false,
                mensagem: 'Por favor, utilize o método GET para consultar usuários!'
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
            if (dados.codigo && dados.tipo && dados.nome && dados.cpf && dados.rg && dados.genero && dados.telefone && dados.data_nascimento && 
                dados.cep && dados.endereco && dados.cidade && dados.uf && dados.email && dados.senha && dados.agencia)
            {
                const usuario = new Usuario(dados.codigo, dados.tipo, dados.nome, dados.cpf, dados.rg, dados.genero, dados.telefone,
                                            dados.data_nascimento, dados.cep, dados.endereco, dados.cidade, dados.uf, 
                                            dados.email, dados.senha, dados.agencia);
                usuario.alterar().then(() => {
                    resp.status(200).json({
                        status: true,
                        codigo_gerado: usuario.codigo,
                        mensagem: 'Usuário alterado com sucesso!'
                    });
                })
                .catch((erro) => {
                    resp.status(500).json({
                        status: false,
                        mensagem: 'Erro ao alterar usuário: ' + erro.message
                    });
                });
            } 
            else 
            {
                resp.status(400).json({
                    status: false,
                    mensagem: 'Informe todos os dados do usuário!'
                });
            }
        } 
        else 
        {
            resp.status(400).json({
                status: false,
                mensagem: 'O método PUT ou o usuário no formato JSON não foi fornecido.'
            });
        }
    }

    // Chama a função alterarProduto de UsuarioProduto para alterar e confirmar a alteração
    alterarProduto(req, resp)
    {
        resp.type('application/json');
        if (req.method==='PUT' && req.is('application/json')) 
        {
            const dados = req.body;
            if (dados.usuario && dados.produto)
            {
                switch (dados.produto.tipo)
                {
                    case 'Cartão de Crédito':
                        if (!dados.data_contratacao && dados.saldo)
                        {
                            resp.status(400).json({
                                status: false,
                                mensagem: 'Informe todos os dados obrigatórios do cartão de crédito!'
                            });
                            return;
                        }
                        break;
                    case 'Cartão de Débito':
                    case 'Seguro':
                    case 'Financiamento':
                    case 'Empréstimo':
                        if (!dados.data_contratacao)
                        {
                            resp.status(400).json({
                                status: false,
                                mensagem: 'Informe todos os dados obrigatórios do produto!'
                            });
                            return;
                        }
                        break;
                    default:
                        resp.status(400).json({
                            status: false,
                            mensagem: 'Informe um tipo de produto válido!'
                        });
                        return;
                }
                const usuarioProduto = new UsuarioProduto(dados.usuario, dados.produto, dados.data_contratacao, dados.saldo);
                usuarioProduto.alterar().then(() => {
                    resp.status(200).json({
                        status: true,
                        mensagem: 'Produto do usuário alterado com sucesso!'
                    });
                })
                .catch((erro) => {
                    resp.status(500).json({
                        status: false,
                        mensagem: 'Erro ao alterar produto do usuário: ' + erro.message
                    });
                });
            } 
            else 
            {
                resp.status(400).json({
                    status: false,
                    mensagem: 'Informe todos os dados do produto do usuário!'
                });
            }
        } 
        else 
        {
            resp.status(400).json({
                status: false,
                mensagem: 'O método PUT ou o produto do usuário no formato JSON não foi fornecido.'
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
            if (dados.codigo)
            {
                const usuario = new Usuario(dados.codigo);
                usuario.excluir().then(() => {
                    resp.status(200).json({
                        status: true,
                        mensagem: 'Usuário excluído com sucesso!'
                    });
                })
                .catch((erro) => {
                    resp.status(500).json({
                        status: false,
                        mensagem: 'Erro ao excluir usuário: ' + erro.message
                    });
                });
            } 
            else 
            {
                resp.status(400).json({
                    status: false,
                    mensagem: 'Informe o código do usuário a ser excluído!'
                });
            }
        } 
        else 
        {
            resp.status(400).json({
                status: false,
                mensagem: 'O método DELETE ou o código de usuario no formato JSON não foi fornecido.'
            });
        }
    }

    // Chama a função excluirProduto de UsuarioProduto para excluir e confirmar a exclusão
    excluirProduto(req, resp) 
    {
        resp.type('application/json');
        if (req.method==='DELETE' && req.is('application/json')) 
        {
            const dados = req.body;
            if (dados.usuario_codigo && dados.produto_codigo)
            {
                const usuario = new Usuario(dados.usuario_codigo);
                const produto = new Produto(dados.produto_codigo);
                const usuarioProduto = new UsuarioProduto(usuario, produto);
                usuarioProduto.excluir().then(() => {
                    resp.status(200).json({
                        status: true,
                        mensagem: 'Produto excluído do usuário com sucesso!'
                    });
                })
                .catch((erro) => {
                    resp.status(500).json({
                        status: false,
                        mensagem: 'Erro ao excluir produto do usuário: ' + erro.message
                    });
                });
            } 
            else 
            {
                resp.status(400).json({
                    status: false,
                    mensagem: 'Informe o código do usuário e do produto a ser excluído!'
                });
            }
        } 
        else 
        {
            resp.status(400).json({
                status: false,
                mensagem: 'O método DELETE ou o código de usuario e produto no formato JSON não foi fornecido.'
            });
        }
    }
}
