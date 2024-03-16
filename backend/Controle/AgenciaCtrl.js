import Agencia from '../Modelo/Agencia.js';
//import Agencia_Produto from '../Modelo/Agencia_Produto.js';

export default class AgenciaCtrl 
{
    //Chama a função cadastrar de Agencia para cadatrar e confirmar o cadastro
    cadastrar(req, resp) 
    {
        resp.type('application/json');
        if (req.method === 'POST' && req.is('application/json')) 
        {
            const dados = req.body;
            const endereco = dados.endereco;
            const cidade = dados.cidade;
            const uf = dados.uf;
            if (endereco && cidade && uf) 
            {
                const agencia = new Agencia(0, endereco, cidade, uf);
                agencia.cadastrarBD().then(() => {
                    resp.status(201).json({
                        "status": true,
                        "cod_ag": agencia.cod_ag,
                        "mensagem": 'Agência cadastrada com sucesso!'
                    });
                })
                .catch((erro) => {
                    resp.status(500).json({
                        "status": false,
                        "msg": "Erro ao cadastrar agência: " + erro.message
                    });
                });
            } 
            else 
            {
                resp.status(400).json({
                    "status": false,
                    "mensagem": "Informe todos os dados da agência: Endereço, Cidade e UF"
                });
            }
        } 
        else 
        {
            resp.status(400).json({
                "status": false,
                "mensagem": "O método POST ou a agência no formato JSON não foram fornecidos. Consulte a documentação do Projeto!"
            });
        }
    }

    // ---------------------------------LISTAR TODAS AS AGÊNCIAS---------------------------------
    consultar(req, resp) {
        resp.type('application/json');

        if (req.method === 'GET') {
            const agencia = new Agencia();
            // // método assíncrono consultar da camada de persistência
            agencia
                .consultarBD()
                .then((agencias) => {
                    resp.status(200).json(agencias);
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

    // ---------------------------------ALTERAR A AGÊNCIA NO BANCO DE DADOS---------------------------------
    alterar(req, resp) {
        resp.type('application/json');
        if (req.method === 'PUT' && req.is('application/json')) {
            const dados = req.body;
            const cod_ag = dados.cod_ag;
            const endereco = dados.endereco;
            const cidade = dados.cidade;
            const uf = dados.uf;

            // if (cod_ag && endereco && cidade && uf) {
            if (cod_ag && endereco && cidade && uf) {
                // alterar as informações da agência
                const agencia = new Agencia(cod_ag, endereco, cidade, uf);
                // chamando o método assíncrono alterar da camada de persistência
                agencia
                    .alterarBD()
                    .then(() => {
                        resp.status(200).json({
                            status: true,
                            msg: 'Endereço da agência alterado com sucesso!',
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
                    msg: 'Informe o novo endereço da agência.',
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

    // ---------------------------------EXCLUIR A AGÊNCIA DO BANCO DE DADOS---------------------------------
    excluir(req, resp) {
        resp.type('application/json');
        if (req.method === 'DELETE' && req.is('application/json')) {
            const dados = req.body;
            // const codigo = dados.codigo;
            if (dados.cod_ag) {
                const agencia = new Agencia();
                agencia.cod_ag = dados.cod_ag;
                agencia
                    .excluirBD()
                    .then(() => {
                        resp.status(200).json({
                            status: true,
                            msg: 'Agência excluída com sucesso!',
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
                    msg: 'Informe o código da agência a ser excluída.',
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

    /* // ---------------------------------CONSULTAR PARA ALTERAR AGÊNCIA---------------------------------
    consultarParaAlterar(req, resp) {
        resp.type('application/json');

        if (req.method === 'GET') {
            const cod_ag = req.params.cod_ag;
            const agencia = new Agencia();
            // // método assíncrono consultar da camada de persistência
            agencia
                .consultarBD(cod_ag)
                .then((agencias) => {
                    resp.status(200).json(agencias);
                })
                .catch((erro) => {
                    resp.status(500).json({
                        status: false,
                        msg: erro.message,
                    });
                });
            // console.log('backend funcionando para GET');
        } else {
            resp.status(400).json({
                status: false,
                msg: 'O método não é permitido! Consulte a documentação da API!',
            });
        }
    }

    // ASSOCIAR PRODUTO A AGÊNCIA
    associarProduto(req, resp) {
        resp.type('application/json');
        if (req.method === 'POST' && req.is('application/json')) {
            const dados = req.body;
            const cod_ag = dados.cod_ag;
            const cod_prod = dados.cod_prod;

            if (cod_ag && cod_prod) {
                // const agencia = new Agencia(0, endereco, cidade);
                // CRIAR MODELO AGENCIAPRODUTO
                const agencia_produto = new Agencia_Produto(cod_ag, cod_prod);
                // console.log('Agência cadastrada (endereço) / cidade:', agencia.endereco, agencia.cidade);

                agencia_produto
                    .cadastrarBD()
                    .then(() => {
                        resp.status(200).json({
                            status: true,
                            cod_ag: agencia_produto.cod_ag, //nao retirar
                            cod_prod: agencia_produto.cod_prod,
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
    } */
}
