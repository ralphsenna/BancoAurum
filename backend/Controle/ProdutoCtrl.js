import Produto from '../Modelo/Produto.js';

export default class ProdutoCtrl 
{
    // Chama a função cadastrar de Produto para cadatrar e confirmar o cadastro
    cadastrar(req, resp)
    {
        resp.type('application/json');
        if (req.method==='POST' && req.is('application/json')) 
        {
            const dados = req.body;
            const nome = dados.nome;
            if (nome) 
            {
                const produto = new Produto(0, nome);
                produto.cadastrar().then(() => {
                    resp.status(201).json({
                        "status": true,
                        "codigoGerado": produto.cod_prod,
                        "mensagem": 'Produto cadastrado com sucesso!'
                    });
                })
                .catch((erro) => {
                    resp.status(500).json({
                        "status": false,
                        "mensagem": 'Erro ao cadastrar produto: ' + erro.message
                    });
                });
            }
            else 
            {
                resp.status(400).json({
                    "status": false,
                    "mensagem": 'Informe o nome do produto!'
                });
            }
        }
        else 
        {
            resp.status(400).json({
                "status": false,
                "mensagem": 'O método POST ou o produto no formato JSON não foi fornecido. Consulte a documentação do projeto!'
            });
        }
    }

    // Chama a função consultar de Produto para consultar e mostrar a consulta
    consultar(req, resp) 
    {
        resp.type('application/json');
        const paramConsulta = req.body;
        if (req.method==='GET') 
        {
            const produto = new Produto();
            produto.consultar(paramConsulta).then((listaProdutos) => {
                    resp.status(200).json({
                        "status": true,
                        listaProdutos
                    });
                })
                .catch((erro) => {
                    resp.status(500).json({
                        "status": false,
                        "mensagem": 'Erro ao obter produtos: ' + erro.message
                    });
                });
        } 
        else 
        {
            resp.status(400).json({
                "status": false,
                "mensagem": 'Por favor, utilize o método GET para consultar produtos!'
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
            const cod_prod = dados.cod_prod;
            const nome = dados.nome;
            if (cod_prod && nome) 
            {
                const produto = new Produto(cod_prod, nome);
                produto.alterar().then(() => {
                    resp.status(200).json({
                        "status": true,
                        "mensagem": 'Produto alterado com sucesso!'
                    });
                })
                .catch((erro) => {
                    resp.status(500).json({
                        "status": false,
                        "mensagem": 'Erro ao alterar produto: ' + erro.message
                    });
                });
            } 
            else 
            {
                resp.status(400).json({
                    "status": false,
                    "mensagem": 'Informe o código e o novo nome do produto!'
                });
            }
        } 
        else 
        {
            resp.status(400).json({
                "status": false,
                "mensagem": 'O método PUT ou o produto no formato JSON não foi fornecido. Consulte a documentação do projeto!'
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
            const cod_prod = dados.cod_prod;
            if (cod_prod) 
            {
                const produto = new Produto(cod_prod);
                produto.excluir().then(() => {
                    resp.status(200).json({
                        "status": true,
                        "mensagem": 'Produto excluído com sucesso!'
                    });
                })
                .catch((erro) => {
                    resp.status(500).json({
                        "status": false,
                        "mensagem": 'Erro ao excluir produto: ' + erro.message
                    });
                });
            } 
            else 
            {
                resp.status(400).json({
                    "status": false,
                    "mensagem": 'Informe o código do produto a ser excluído!'
                });
            }
        } 
        else 
        {
            resp.status(400).json({
                "status": false,
                "mensagem": 'O método DELETE ou o código do produto no formato JSON não foi fornecido. Consulte a documentação do projeto!'
            });
        }
    }
}
