import Usuario from '../Modelo/Usuario.js';

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

    // Chama a função consultar de Usuario para consultar e mostrar os usuarios
    consultar(req, resp) 
    {
        const termo = req.body;
        resp.type('application/json');
        if (req.method==='GET') 
        {
            const usuario = new Usuario();
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
}
