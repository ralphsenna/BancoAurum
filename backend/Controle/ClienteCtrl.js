import Cliente from '../Modelo/Cliente.js';
import Agencia from '../Modelo/Agencia.js';

export default class ClienteCtrl 
{
    // Chama a função cadastrarBD de Cliente para cadatrar e confirmar o cadastro
    cadastrar(req, resp) 
    {
        resp.type('application/json');
        if (req.method === 'POST' && req.is('application/json')) 
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
                const cliente = new Cliente(0, nome, cpf, rg, dataNasc, endereco, cidade, uf, email, telefone, objAgencia);
                cliente.cadastrarBD().then(() => {
                    resp.status(201).json({
                        "status": true,
                        "codigoGerado": cliente.cod_cli,
                        "mensagem": 'Cliente cadastrado com sucesso!'
                    });
                })
                .catch((erro) => {
                    resp.status(500).json({
                        "status": false,
                        "mensagem": 'Erro ao cadastrar cliente: ' + erro.message
                    });
                });
            } 
            else 
            {
                resp.status(400).json({
                    "status": false,
                    "mensagem": 'Informe todos os dados do cliente: Nome, CPF, RG, Data de Nascimento, Endereço, Cidade, UF, E-mail, Telefone e Agência.'
                });
            }
        } 
        else 
        {
            resp.status(400).json({
                "status": false,
                "mensagem": 'O método POST ou o cliente no formato JSON não foi fornecido. Consulte a documentação do projeto!'
            });
        }
    }

    // Chama a função consultarBD de Cliente para consultar e mostrar a consulta
    consultar(req, resp) 
    {
        resp.type('application/json');
        const paramConsulta = req.body;
        if (req.method === 'GET') 
        {
            const cliente = new Cliente();
            cliente.consultarBD(paramConsulta).then((listaClientes) => {
                resp.status(200).json({
                    "status": true,
                    listaClientes
                });
            })
            .catch((erro) => {
                resp.status(500).json({
                    "status": false,
                    "mensagem": 'Erro ao obter clientes: ' + erro.message
                });
            });
        } 
        else 
        {
            resp.status(400).json({
                "status": false,
                "mensagem": 'Por favor, utilize o método GET para consultar clientes!'
            });
        }
    }

    // Chama a função alterarBD de Cliente para alterar e confirmar a alteração
    alterar(req, resp) 
    {
        resp.type('application/json');
        if (req.method === 'PUT' && req.is('application/json')) 
        {
            const dados = req.body;
            const cod_cli = dados.cod_cli;
            const endereco = dados.endereco;
            const cidade = dados.cidade;
            const uf = dados.uf;
            const email = dados.email;
            const telefone = dados.telefone;
            const agencia = dados.agencia;
            const objAgencia = new Agencia(agencia);
            if (endereco && cidade && uf && email && telefone && agencia) 
            {
                const cliente = new Cliente(cod_cli, '', '', '', '', endereco, cidade, uf, email, telefone, objAgencia);
                cliente.alterarBD().then(() => {
                    resp.status(200).json({
                        "status": true,
                        "mensagem": 'Cliente alterado com sucesso!'
                    });
                })
                .catch((erro) => {
                    resp.status(500).json({
                        "status": false,
                        "mensagem": 'Erro ao alterar cliente: ' + erro.message
                    });
                });
            } 
            else 
            {
                resp.status(400).json({
                    "status": false,
                    "mensagem": 'Informe todos os novos dados possíveis de alteração do cliente: Endereço, Cidade, UF, E-mail, Telefone e Agência.'
                });
            }
        } 
        else 
        {
            resp.status(400).json({
                "status": false,
                "mensagem": 'O método PUT ou o cliente no formato JSON não foi fornecido. Consulte a documentação do projeto!'
            });
        }
    }

    // Chama a função excluirBD de Cliente para excluir e confirmar a exclusão
    excluir(req, resp) 
    {
        resp.type('application/json');
        if (req.method === 'DELETE' && req.is('application/json')) 
        {
            const dados = req.body;
            const cod_cli = dados.cod_cli;
            if (cod_cli)
            {
                const cliente = new Cliente(cod_cli);
                cliente.excluirBD().then(() => {
                    resp.status(200).json({
                        "status": true,
                        "mensagem": 'Cliente excluído com sucesso!'
                    });
                })
                .catch((erro) => {
                    resp.status(500).json({
                        "status": false,
                        "mensagem": 'Erro ao excluir cliente: ' + erro.message
                    });
                });
            } 
            else 
            {
                resp.status(400).json({
                    "status": false,
                    "mensagem": 'Informe o código do cliente a ser excluído!'
                });
            }
        } 
        else 
        {
            resp.status(400).json({
                "status": false,
                "mensagem": 'O método DELETE ou o código de cliente no formato JSON não foi fornecido. Consulte a documentação do projeto!'
            });
        }
    }

    /* // CONSULTAR PARA ALTERAR CLIENTE
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
    }*/
}
