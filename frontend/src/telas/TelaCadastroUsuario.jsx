import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Pagina from '../Templates/Pagina';
import TabelaUsuario from '../Tabelas/TabelaUsuario'; 
import FormCadUsuario from '../Formularios/FormCadUsuario';

// URL para acessar o Backend de Agencia e de Usuario
const urlAgencia = 'http://localhost:4000/agencia';
const urlUsuario = 'http://localhost:4000/usuario';

export default function TelaCadastroUsuario(props) 
{
    // Constantes para definir e controlar o estado das variáveis utilizadas
    const [exibirTabela, setExibirTabela] = useState(true);
    const [listaAgencias, setListaAgencias] = useState([{ 
        cod_ag: '', 
        endereco: 'Nenhuma agência cadastrada', 
        cidade: '', 
        uf: '', 
        telefone: '' 
    }]);
    const [listaUsuarios, setListaUsuarios] = useState([]);
    const [atualizando, setAtualizando] = useState(false);
    const usuarioVazio = {
        cod_usu: 0,
        nome: '',
        cpf: '',
        rg: '',
        dataNasc: '',
        endereco: '',
        cidade: '',
        uf: '',
        telefone: '',
        tipo: '',
        email: '',
        senha: '',
        agencia: {}
    };
    const [usuarioAtual, setUsuarioAtual] = useState(usuarioVazio);

    // Função para chamar a consulta de agências no Backend para preencher a lista de agências
    async function consultarAgencia()
    {
        await fetch(urlAgencia, {method: 'GET'})
        .then(resposta => resposta.json())
        .then(retorno => {
            if (retorno.status)
                setListaAgencias(retorno.listaAgencias);
            else
                alert(retorno.mensagem);
        })
        .catch(erro => {
            alert('Erro: ' + erro.mensagem);
        });
    }

    // Função para chamar a consulta de usuários no Backend
    async function consultarUsuario() 
    {
        await fetch(urlUsuario, {method: 'GET'})
        .then(resposta => resposta.json())
        .then(retorno => {
            if (retorno.status) 
                setListaUsuarios(retorno.listaUsuarios);
            else 
                alert(retorno.mensagem);
        })
        .catch(erro => {
            alert('Erro: ' + erro.mensagem);
        });
    }
    // Função que movimenta a lista de usuários sempre que a variável exibirTabela for alterada
    useEffect(() => {
        if (exibirTabela)
            consultarUsuario();
        else
            consultarAgencia();
    }, [exibirTabela]);

    // Função para chamar a gravação de um usuário no Backend
    async function gravarUsuario(usuario) 
    {
        await fetch(urlUsuario, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(usuario)
        })
        .then(resposta => resposta.json())
        .then(retorno => {
            if (retorno.status)
            {
                alert(retorno.mensagem + ' Código do usuário: ' + retorno.codigoGerado);   
                setExibirTabela(true);
                setUsuarioAtual(usuarioVazio);    
            }            
            else
                alert(retorno.mensagem);
        })
        .catch(erro => {
            alert('Erro: ' + erro.message);
        });
    }

    // Função para chamar a alteração de um usuário no Backend
    async function alterarUsuario(usuario) 
    {
        if (!atualizando)
        {
            setExibirTabela(false);
            setAtualizando(true);
            setUsuarioAtual(usuario);
        }
        else
        {
            await fetch(urlUsuario, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(usuario)
            })
            .then(resposta => resposta.json())
            .then(retorno => {
                if (retorno.status)
                    alert(retorno.mensagem);
                else
                    alert(retorno.mensagem);
            })
            .catch(erro => {
                alert('Erro: ' + erro.message);
            });
            setAtualizando(false);
            setExibirTabela(true);
            setUsuarioAtual(usuarioVazio);
        }
    }

    // Função para chamar a exclusão de um usuário no Backend
    async function excluirUsuario(usuario) 
    {
        await fetch(urlUsuario, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(usuario)
        })
        .then(resposta => resposta.json())
        .then(retorno => {
            if (retorno.status)
                alert(retorno.mensagem);
            else
                alert(retorno.mensagem);
        })
        .catch(erro => {
            alert('Erro: ' + erro.message);
        });
        consultarUsuario();
    }

    // Se a variável exibirTabela for verdadeira, exibe a tabela de usuários
    if (exibirTabela) 
    {
        return (
            <Pagina titulo="Cadastro de Usuários">
                <h2 style={{ marginTop: '10px' }}>Tela de Cadastro de Usuários</h2>
                    <br/>
                    <h2>Lista de Usuários</h2>
                    <Button className='mb-3' onClick={() => {
                            setExibirTabela(false);
                        }}>
                        Cadastrar Usuário
                    </Button>
                    <TabelaUsuario
                        setExibirTabela={setExibirTabela}
                        listaUsuarios={listaUsuarios} 
                        alterarUsuario={alterarUsuario}
                        excluirUsuario={excluirUsuario}
                    />
            </Pagina>
        )
    }
    else 
    {
        return (
            <Pagina titulo="Cadastro de Usuários">
                <h1>Tela de Cadastro de Usuários</h1>
                    <br/>
                    <h2>Formulário de cadastro de Usuários</h2>
                    <FormCadUsuario 
                        exibirTabela={exibirTabela}
                        setExibirTabela={setExibirTabela}
                        listaAgencias={listaAgencias}
                        gravarUsuario={gravarUsuario}
                        alterarUsuario={alterarUsuario}
                        atualizando={atualizando}
                        setAtualizando={setAtualizando}
                        usuario={usuarioAtual}
                        setUsuarioAtual={setUsuarioAtual}
                        usuarioVazio={usuarioVazio}
                    />
            </Pagina>
        );
    }

}
