import Agencia from '../Modelo/Agencia.js';
import Produto from '../Modelo/Produto.js';
import AgenciaProduto from '../Modelo/AgenciaProduto.js';

export default class AgenciaCtrl 
{
    // Chama a função cadastrar de Agencia para cadatrar e efetivar o cadastro
    cadastrar(req, resp) 
    {
        resp.type('application/json');
        if (req.method==='POST' && req.is('application/json')) 
        {
            const dados = req.body;
            if (dados.numero && dados.telefone && dados.email && dados.cep && dados.endereco && dados.cidade && dados.uf) 
            {
                const agencia = new Agencia(0, dados.numero, dados.telefone, dados.email, dados.cep, dados.endereco, dados.cidade, dados.uf);
                agencia.cadastrar().then(() => {
                    resp.status(201).json({
                        status: true,
                        codigo_gerado: agencia.codigo,
                        mensagem: 'Agência cadastrada com sucesso!'
                    });
                })
                .catch((erro) => {
                    resp.status(500).json({
                        status: false,
                        mensagem: 'Erro ao cadastrar agência: ' + erro.message
                    });
                });
            } 
            else 
            {
                resp.status(400).json({
                    status: false,
                    mensagem: 'Informe todos os dados da agência!'
                });
            }
        } 
        else 
        {
            resp.status(400).json({
                status: false,
                mensagem: 'O método POST ou a agência no formato JSON não foi fornecido.'
            });
        }
    }

    cadastrarProduto(req, resp)
    {   
        resp.type('application/json');
        if (req.method==='POST' && req.is('application/json'))
        {
            const dados = req.body;
            if (dados.agencia && dados.produto && dados.data_adesao)
            {
                const agenciaProduto = new AgenciaProduto(dados.agencia, dados.produto, dados.data_adesao);
                agenciaProduto.cadastrar().then(() => {
                    resp.status(201).json({
                        status: true,
                        codigo_gerado: agenciaProduto.produto.codigo,
                        mensagem: 'Produto cadastrado na agência com sucesso!'
                    });
                })
                .catch((erro) => {
                    resp.status(500).json({
                        status: false,
                        mensagem: 'Erro ao cadastrar produto na agência: ' + erro.message
                    });
                });
            }
            else
            {
                resp.status(400).json({
                    status: false,
                    mensagem: 'Informe todos os dados da agência e produto!'
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

    // Chama a função consultar de Agencia para consultar e mostrar as agencias
    consultar(req, resp) 
    {
        const termo = req.params.termo ? req.params.termo : '';
        resp.type('application/json');
        if (req.method==='GET') 
        {
            const agencia = new Agencia();
            if (isNaN(parseInt(termo)))
            {
                agencia.consultar(termo).then((listaAgencias) => {
                    resp.status(200).json({
                        status: true,
                        listaAgencias
                    });
                })
                .catch((erro) => {
                    resp.status(500).json({
                        status: false,
                        mensagem: 'Erro ao obter agências: ' + erro.message
                    });
                });
            }
            else
            {
                agencia.consultar(termo).then((listaProdutos) => {
                    resp.status(200).json({
                        status: true,
                        listaProdutos
                    });
                })
                .catch((erro) => {
                    resp.status(500).json({
                        status: false,
                        mensagem: 'Erro ao obter produtos da agência: ' + erro.message
                    });
                });
            }
        } 
        else 
        {
            resp.status(400).json({
                status: false,
                mensagem: 'Por favor, utilize o método GET para consultar agências!'
            });
        }
    }

    // Chama a função alterar de Agencia para alterar e efetivar a alteração
    alterar(req, resp) 
    {
        resp.type('application/json');
        if (req.method==='PUT' && req.is('application/json'))
        {
            const dados = req.body;
            if (dados.codigo, dados.numero && dados.telefone && dados.email && dados.cep && dados.endereco && dados.cidade && dados.uf)
            {
                const agencia = new Agencia(dados.codigo, dados.numero, dados.telefone, dados.email, dados.cep, dados.endereco, dados.cidade, dados.uf);
                agencia.alterar().then(() => {
                    resp.status(200).json({
                        status: true,
                        mensagem: 'Agência alterada com sucesso!'
                    });
                })
                .catch((erro) => {
                    resp.status(500).json({
                        status: false,
                        mensagem: 'Erro ao alterar agência: ' + erro.message
                    });
                });
            } 
            else 
            {
                resp.status(400).json({
                    status: false,
                    mensagem: 'Informe todos os dados da agência!'
                });
            }
        } 
        else 
        {
            resp.status(400).json({
                status: false,
                mensagem: 'O método PUT ou a agência no formato JSON não foi fornecido.'
            });
        }
    }

    alterarProduto(req, resp)
    {
        resp.type('application/json');
        if (req.method==='PUT' && req.is('application/json'))
        {
            const dados = req.body;
            if (dados.agencia && dados.produto && dados.data_adesao)
            {
                const agenciaProduto = new AgenciaProduto(dados.agencia, dados.produto, dados.data_adesao);
                agenciaProduto.alterar().then(() => {
                    resp.status(200).json({
                        status: true,
                        mensagem: 'Produto da agência alterado com sucesso!'
                    });
                })
                .catch((erro) => {
                    resp.status(500).json({
                        status: false,
                        mensagem: 'Erro ao alterar produto da agência: ' + erro.message
                    });
                });
            } 
            else 
            {
                resp.status(400).json({
                    status: false,
                    mensagem: 'Informe todos os dados do produto da agência!'
                });
            }
        } 
        else 
        {
            resp.status(400).json({
                status: false,
                mensagem: 'O método PUT ou o produto da agência no formato JSON não foi fornecido.'
            });
        }
    }

    // Chamada a função excluir de Agencia para excluir e efetivar a exclusão
    excluir(req, resp) 
    {
        resp.type('application/json');
        if (req.method==='DELETE' && req.is('application/json')) 
        {
            const dados = req.body;
            if (dados.codigo) 
            {
                const agencia = new Agencia(dados.codigo);
                agencia.excluir().then(() => {
                    resp.status(200).json({
                        status: true,
                        mensagem: 'Agência excluída com sucesso!'
                    });
                })
                .catch((erro) => {
                    resp.status(500).json({
                        status: false,
                        mensagem: 'Erro ao excluir agência: ' + erro.message
                    });
                });
            } 
            else 
            {
                resp.status(400).json({
                    status: false,
                    mensagem: 'Informe o código da agência a ser excluída!'
                });
            }
        } 
        else 
        {
            resp.status(400).json({
                status: false,
                mensagem: 'O método DELETE ou o código da agência no formato JSON não foi fornecido.'
            });
        }
    }

    excluirProduto(req, resp)
    {
        resp.type('application/json');
        if (req.method==='DELETE' && req.is('application/json'))
        {
            const dados = req.body;
            if (dados.agencia_codigo && dados.produto_codigo)
            {
                const agencia = new Agencia(dados.agencia_codigo);
                const produto = new Produto(dados.produto_codigo);
                const agenciaProduto = new AgenciaProduto(agencia, produto);
                agenciaProduto.excluir().then(() => {
                    resp.status(200).json({
                        status: true,
                        mensagem: 'Produto excluído da agência com sucesso!'
                    });
                })
                .catch((erro) => {
                    resp.status(500).json({
                        status: false,
                        mensagem: 'Erro ao excluir produto da agência: ' + erro.message
                    });
                });
            }
            else
            {
                resp.status(400).json({
                    status: false,
                    mensagem: 'Informe o código da agência e do produto a ser excluído!'
                });
            }
        }
        else
        {
            resp.status(400).json({
                status: false,
                mensagem: 'O método DELETE ou o código da agência e do produto no formato JSON não foi fornecido.'
            });
        }
    }
}
