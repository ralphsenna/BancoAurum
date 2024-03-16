import Produto from '../Modelo/Produto.js';

export default class ProdutoCtrl {
    // GRAVAR O PRODUTO NO BANCO DE DADOS
    cadastrar(req, resp) {
        resp.type('application/json');
        if (req.method === 'POST' && req.is('application/json')) {
            const dados = req.body;
            // EM TODOS OS CÓDIGOS AUTO_INCREMENT, NÃO DEVE DECLARAR A CONST COM O CÓDIGO NA INSERÇÃO (CADASTRAR)
            const nome = dados.nome;

            // if (cod_prod && nome) {
            if (nome) {
                const produto = new Produto(0, nome);
                produto.cadastrarBD().then(() => {
                    resp.status(200).json({
                        status: true,
                        cod_prod: produto.cod_prod,
                        nome: produto.nome,
                        msg: 'Produto cadastrado com sucesso!',
                    });
                });
            }
        }
    }

    // EXCLUIR O PRODUTO DO BANCO DE DADOS
    excluir(req, resp) {
        resp.type('application/json');
        if (req.method === 'DELETE' && req.is('application/json')) {
            const dados = req.body;
            if (dados.cod_prod) {
                const produto = new Produto();
                produto.cod_prod = dados.cod_prod;
                produto
                    .excluirBD()
                    .then(() => {
                        resp.status(200).json({
                            status: true,
                            msg: 'Produto excluído com sucesso!',
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
                    msg: 'Informe o código do produto a ser excluído.',
                });
            }
        } else {
            resp.status(400).json({
                status: false,
                msg: 'O método não é permitido ou o produto no formato JSON não foi fornecido. Consulte a documentação da API.',
            });
        }
    }

    // CONSULTAR O PRODUTO NO BANCO DE DADO
    consultar(req, resp) {
        resp.type('application/json');

        if (req.method === 'GET') {
            const produto = new Produto();
            produto
                .consultarBD()
                .then((produtos) => {
                    resp.status(200).json(produtos);
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

    // IMPLEMENTAR POSTERIORMENTE
    associarProdutoCliente() { }
}
