import Cliente from '../Modelo/Cliente.js';

export default class ClienteCtrl {
    // GRAVAR O CLIENTE NO BANCO DE DADOS------------------------------------------------------------------------
    cadastrar(req, resp) {
        resp.type('application/json');
        if (req.method === 'POST' && req.is('application/json')) {
            const dados = req.body;
            // const cod_cli = dados.cod_cli;
            const nome = dados.nome;
            const cpf = dados.cpf;
            const dataNasc = dados.dataNasc;
            const endereco = dados.endereco;
            const cidade = dados.cidade;
            const uf = dados.uf;
            const email = dados.email;
            const telefone = dados.telefone;
            const cod_ag = dados.cod_ag;
            // const senha = dados.senha;
            if (nome && cpf && dataNasc && endereco && cidade && uf && email && cod_ag) {
                // gravar as informações da conta
                // const conta = new Conta(0, nome, cpf, dataNasc, endereco, cidade, uf, email, telefone);
                const cliente = new Cliente(0, nome, cpf, dataNasc, endereco, cidade, uf, email, telefone, cod_ag);

                cliente
                    .cadastrarBD()
                    .then(() => {
                        resp.status(200).json({
                            status: true,
                            cod_cli: cliente.cod_cli,
                            msg: 'Conta criada com sucesso!',
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
                    msg: 'Informe todos os dados do cliente: nome, CPF, data de nascimento, endereço, cidade, UF, email, senha e código da agência',
                });
            }
        } else {
            // 4xx = 'Client error'
            resp.status(400).json({
                status: false,
                msg: 'O método não é permitido ou cliente no formato JSON não foi fornecido. Consulte a documentação da API!',
            });
        }
    }

    // ---------------------------------ALTERAR O CLIENTE NO BANCO DE DADOS---------------------------------
    alterar(req, resp) {
        resp.type('application/json');
        if (req.method === 'PUT' && req.is('application/json')) {
            const dados = req.body;
            const cod_cli = dados.cod_cli;
            const nome = dados.nome;
            const cpf = dados.cpf;
            const dataNasc = dados.dataNasc;
            const endereco = dados.endereco;
            const cidade = dados.cidade;
            const uf = dados.uf;
            const email = dados.email;
            const telefone = dados.telefone;
            // const senha = dados.senha;

            // if (email && nome && senha && ano && codigo) {
            if (nome && cpf && dataNasc && endereco && cidade && uf && email) {
                // alterar as informações do cliente
                const conta = new Cliente(cod_cli, nome, cpf, dataNasc, endereco, cidade, uf, email, telefone, senha);
                // chamando o método assíncrono alterar da camada de persistência
                conta
                    .alterarBD()
                    .then(() => {
                        resp.status(200).json({
                            status: true,
                            msg: 'Cliente alterado com sucesso!',
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
                    msg: 'Informe todos os dados do cliente: nome, CPF, data de nascimento, endereço, cidade, UF, email e senha',
                });
            }
        } else {
            // 4xx = 'Client error'
            resp.status(400).json({
                status: false,
                msg: 'O método não é permitido ou cliente no formato JSON não foi fornecido. Consulte a documentação da API!',
            });
        }
    }

    // ---------------------------------EXCLUIR O CLIENTE DO BANCO DE DADOS---------------------------------
    excluir(req, resp) {
        resp.type('application/json');
        if (req.method === 'DELETE' && req.is('application/json')) {
            const dados = req.body;
            if (dados.cod_cli) {
                const cliente = new Cliente();
                cliente.cod_cli = dados.cod_cli;
                // chamando o método assíncrono excluir da camada de persistência
                cliente
                    .excluirBD()
                    .then(() => {
                        resp.status(200).json({
                            status: true,
                            msg: 'Cliente excluído com sucesso!',
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
                    msg: 'Informe o código do cliente a ser excluído.',
                });
            }
        } else {
            // 4xx = 'Client error'
            resp.status(400).json({
                status: false,
                msg: 'O método não é permitido ou cliente no formato JSON não foi fornecido. Consulte a documentação da API!',
            });
        }
    }

    // ---------------------------------LISTAR TODOS OS CLIENTES---------------------------------
    consultar(req, resp) {
        resp.type('application/json');

        if (req.method === 'GET') {
            const cliente = new Cliente();
            // // método assíncrono consultar da camada de persistência
            cliente
                .consultarBD()
                .then((clientes) => {
                    resp.status(200).json(clientes);
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

    // CONSULTAR PARA ALTERAR CLIENTE
    consultarParaAlterar(req, resp) {
        resp.type('application/json');

        if (req.method === 'GET') {
            const cod_cli = req.params.cod_cli;
            const cliente = new Cliente();
            // // método assíncrono consultar da camada de persistência
            cliente
                .consultarBD(cod_cli)
                .then((clientes) => {
                    resp.status(200).json(clientes);
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

    // ASSOCIAR PRODUTO A CLIENTE
    associarProdutoCliente(req, resp) {
        resp.type('application/json');
        if (req.method === 'POST' && req.is('application/json')) {
            const dados = req.body;
            const cod_cli = dados.cod_cli;
            const cod_prod = dados.cod_prod;

            if (cod_cli && cod_prod) {
                // CRIAR MODELO CLIENTEPRODUTO
                const cliente_produto = new ClienteProduto(cod_cli, cod_prod);
                // console.log('Agência cadastrada (endereço) / cidade:', agencia.endereco, agencia.cidade);

                cliente_produto
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
            // 4xx = 'Client error'
            resp.status(400).json({
                status: false,
                msg: 'O método não é permitido ou agência no formato JSON não foi fornecida. Consulte a documentação da API!',
            });
        }
    }
}
