import Agencia from '../Modelo/Agencia.js';

export default class AgenciaCtrl 
{
    // Chama a função cadastrar de Agencia para cadatrar e confirmar o cadastro
    cadastrar(req, resp) 
    {
        resp.type('application/json');
        if (req.method==='POST' && req.is('application/json')) 
        {
            const dados = req.body;
            const endereco = dados.endereco;
            const cidade = dados.cidade;
            const uf = dados.uf;
            const telefone = dados.telefone;
            if (endereco && cidade && uf && telefone) 
            {
                const agencia = new Agencia(0, endereco, cidade, uf, telefone, {});
                agencia.cadastrar().then(() => {
                    resp.status(201).json({
                        'status': true,
                        'codigoGerado': agencia.cod_ag,
                        'mensagem': 'Agência cadastrada com sucesso!'
                    });
                })
                .catch((erro) => {
                    resp.status(500).json({
                        'status': false,
                        'mensagem': 'Erro ao cadastrar agência: ' + erro.message
                    });
                });
            } 
            else 
            {
                resp.status(400).json({
                    'status': false,
                    'mensagem': 'Informe todos os dados da agência: Endereço, Cidade e UF.'
                });
            }
        } 
        else 
        {
            resp.status(400).json({
                'status': false,
                'mensagem': 'O método POST ou a agência no formato JSON não foi fornecido. Consulte a documentação do projeto!'
            });
        }
    }

    // Chama a função consultar de Agencia para consultar e mostrar a consulta
    consultar(req, resp) 
    {
        resp.type('application/json');
        const paramConsulta = req.body;
        if (req.method==='GET') 
        {
            const agencia = new Agencia();
            agencia.consultar(paramConsulta).then((listaAgencias) => {
                resp.status(200).json({
                    'status': true,
                    listaAgencias
                });
            })
            .catch((erro) => {
                resp.status(500).json({
                    'status': false,
                    'mensagem': 'Erro ao obter agências: ' + erro.message
                });
            });
        } 
        else 
        {
            resp.status(400).json({
                'status': false,
                'mensagem': 'Por favor, utilize o método GET para consultar agencias!'
            });
        }
    }

    // Chama a função alterar de Agencia para alterar e confirmar a alteração
    alterar(req, resp) 
    {
        resp.type('application/json');
        if (req.method==='PUT' && req.is('application/json'))
        {
            const dados = req.body;
            const cod_ag = dados.cod_ag;
            const endereco = dados.endereco;
            const cidade = dados.cidade;
            const uf = dados.uf;
            const telefone = dados.telefone;
            if (cod_ag && endereco && cidade && uf && telefone) 
            {
                const agencia = new Agencia(cod_ag, endereco, cidade, uf, telefone, {});
                agencia.alterar().then(() => {
                    resp.status(200).json({
                        'status': true,
                        'mensagem': 'Agência alterada com sucesso!'
                    });
                })
                .catch((erro) => {
                    resp.status(500).json({
                        'status': false,
                        'mensagem': 'Erro ao alterar agência: ' + erro.message
                    });
                });
            } 
            else 
            {
                resp.status(400).json({
                    'status': false,
                    'mensagem': 'Informe o código e o novo endereço da agência!'
                });
            }
        } 
        else 
        {
            resp.status(400).json({
                'status': false,
                'mensagem': 'O método PUT ou o endereço da agência no formato JSON não foi fornecido. Consulte a documentação do projeto!'
            });
        }
    }

    // Chamada a função excluir de Agencia para excluir e confirmar a exclusão
    excluir(req, resp) 
    {
        resp.type('application/json');
        if (req.method==='DELETE' && req.is('application/json')) 
        {
            const dados = req.body;
            const cod_ag = dados.cod_ag;
            if (cod_ag) 
            {
                const agencia = new Agencia(cod_ag);
                agencia.excluir().then(() => {
                    resp.status(200).json({
                        'status': true,
                        'mensagem': 'Agência excluída com sucesso!',
                    });
                })
                .catch((erro) => {
                    resp.status(500).json({
                        'status': false,
                        'mensagem': 'Erro ao excluir agência: ' + erro.message
                    });
                });
            } 
            else 
            {
                resp.status(400).json({
                    'status': false,
                    'mensagem': 'Informe o código da agência a ser excluída!'
                });
            }
        } 
        else 
        {
            resp.status(400).json({
                'status': false,
                'mensagem': 'O método DELETE ou o código da agência no formato JSON não foi fornecido. Consulte a documentação do projeto!'
            });
        }
    }
}
