import Produto from '../Modelo/Produto.js';

export default class ProdutoCtrl 
{
    // Chama a função cadastrar de Produto para cadatrar e efetivar o cadastro
    cadastrar(req, resp)
    {
        resp.type('application/json');
        if (req.method==='POST' && req.is('application/json')) 
        {
            const dados = req.body;
            if (dados.tipo && dados.nome) 
            {
                switch (dados.tipo)
                {
                    case 'Cartão de Débito':
                        break;
                    case 'Cartão de Crédito':   
                        if (!dados.limite)
                        {
                            resp.status(400).json({
                                status: false,
                                mensagem: 'Informe todos os dados obrigatórios do cartão de crédito!'
                            });
                            return;
                        }
                        break;
                    case 'Seguro':
                        if (!dados.valor)
                        {
                            resp.status(400).json({
                                status: false,
                                mensagem: 'Informe todos os dados obrigatórios do seguro!'
                            });
                            return;
                        }
                        break;
                    case 'Empréstimo':
                    case 'Financiamento':
                        if (!dados.valor || !dados.juros)
                        {
                            resp.status(400).json({
                                status: false,
                                mensagem: 'Informe todos os dados obrigatórios do '+ dados.tipo.toLowerCase() +'!'
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
                const produto = new Produto(0, dados.tipo, dados.nome, dados.limite, dados.valor, dados.juros);
                produto.cadastrar().then(() => {
                    resp.status(201).json({
                        status: true,
                        codigo_gerado: produto.codigo,
                        mensagem: 'Produto cadastrado com sucesso!'
                    });
                })
                .catch((erro) => {
                    resp.status(500).json({
                        status: false,
                        mensagem: 'Erro ao cadastrar produto: ' + erro.message
                    });
                });
            }
            else 
            {
                resp.status(400).json({
                    status: false,
                    mensagem: 'Informe todos os dados obrigatórios do produto!'
                });
            }
        }
        else 
        {
            resp.status(400).json({
                status: false,
                mensagem: 'O método POST ou o produto no formato JSON não foi fornecido.'
            });
        }
    }

    // Chama a função consultar de Produto para consultar e mostrar os produtos
    consultar(req, resp) 
    {
        const termo = req.body;
        resp.type('application/json');
        if (req.method==='GET') 
        {
            const produto = new Produto();
            produto.consultar(termo).then((listaProdutos) => {
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
        else 
        {
            resp.status(400).json({
                status: false,
                mensagem: 'Por favor, utilize o método GET para consultar produtos!'
            });
        }
    }

    // Chama a função alterar de Produto para alterar e confirmar a alteração
    alterar(req, resp)
    {
        resp.type('application/json');
        if (req.method==='PUT' && req.is('application/json')) 
        {
            const dados = req.body;
            if (dados.codigo && dados.tipo && dados.nome) 
            {
                switch (dados.tipo)
                {
                    case 'Cartão de Débito':
                        break;
                    case 'Cartão de Crédito':   
                        if (!dados.limite)
                        {
                            resp.status(400).json({
                                status: false,
                                mensagem: 'Informe todos os dados obrigatórios do cartão de crédito!'
                            });
                            return;
                        }
                        break;
                    case 'Seguro':
                        if (!dados.valor)
                        {
                            resp.status(400).json({
                                status: false,
                                mensagem: 'Informe todos os dados obrigatórios do seguro!'
                            });
                            return;
                        }
                        break;
                    case 'Empréstimo':
                    case 'Financiamento':
                        if (!dados.valor || !dados.juros)
                        {
                            resp.status(400).json({
                                status: false,
                                mensagem: 'Informe todos os dados obrigatórios do '+ dados.tipo.toLowerCase() +'!'
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
                const produto = new Produto(dados.codigo, dados.tipo, dados.nome, dados.limite, dados.valor, dados.juros);
                produto.alterar().then(() => {
                    resp.status(200).json({
                        status: true,
                        mensagem: 'Produto alterado com sucesso!'
                    });
                })
                .catch((erro) => {
                    resp.status(500).json({
                        status: false,
                        mensagem: 'Erro ao alterar produto: ' + erro.message
                    });
                });
            } 
            else 
            {
                resp.status(400).json({
                    status: false,
                    mensagem: 'Informe todos os dados obrigatórios do produto!'
                });
            }
        } 
        else 
        {
            resp.status(400).json({
                status: false,
                mensagem: 'O método PUT ou o produto no formato JSON não foi fornecido.'
            });
        }
    }

    // Chama a função excluir de Produto para excluir e confirmar a exclusão
    excluir(req, resp) 
    {
        resp.type('application/json');
        if (req.method==='DELETE' && req.is('application/json')) 
        {
            const dados = req.body;
            if (dados.codigo) 
            {
                const produto = new Produto(dados.codigo);
                produto.excluir().then(() => {
                    resp.status(200).json({
                        status: true,
                        mensagem: 'Produto excluído com sucesso!'
                    });
                })
                .catch((erro) => {
                    resp.status(500).json({
                        status: false,
                        mensagem: 'Erro ao excluir produto: ' + erro.message
                    });
                });
            } 
            else 
            {
                resp.status(400).json({
                    status: false,
                    mensagem: 'Informe o código do produto a ser excluído!'
                });
            }
        } 
        else 
        {
            resp.status(400).json({
                status: false,
                mensagem: 'O método DELETE ou o código do produto no formato JSON não foi fornecido.'
            });
        }
    }
}
