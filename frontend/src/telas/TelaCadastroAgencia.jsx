import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Pagina from '../Templates/Pagina';
import TabelaAgencia from '../Tabelas/TabelaAgencia';
import FormCadAgencia from '../Formularios/FormCadAgencia';

// URL para acessar o Backend de Agencia
const urlAgencia = 'http://localhost:4000/agencia';

export default function TelaCadastroAgencia(props)
{
    // Constantes para definir e controlar o estado das váriaveis utilizadas
    const [exibirTabela, setExibirTabela] = useState(true);
    const [listaAgencias, setListaAgencias] = useState([]);
    const [atualizando, setAtualizando] = useState(false);
    const agenciaVazia = {
        codigo: 0,
        numero: 0,
        telefone: '',
        email: '',
        cep: '',
        endereco: '',
        cidade: '',
        uf: '',
        produtos: {}
    };
    const [agenciaAtual, setAgenciaAtual] = useState(agenciaVazia);

    // Função para chamar a consulta de agências no Backend
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
    // Função que movimenta a lista de agências sempre que a variável exibirTabela for alterada
    useEffect(() => {
        if (exibirTabela)
            consultarAgencia();
    }, [exibirTabela]);
    
    // Função para chamar a gravação de uma agência no Backend
    async function gravarAgencia(agencia)
    {
        await fetch(urlAgencia, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(agencia)
        })
        .then(resposta => resposta.json())
        .then(retorno => {
            if (retorno.status)
            {
                alert(retorno.mensagem + ' Código da agência: ' + retorno.codigo_gerado); 
                setExibirTabela(true);
                setAgenciaAtual(agenciaVazia);  
            }
            else
                alert(retorno.mensagem);
        })
        .catch(erro => {
            alert('Erro: ' + erro.message);
        });
        
    }

    // Função para chamar a alteração de uma agência no Backend
    async function alterarAgencia(agencia)
    {
        if (!atualizando)
        {
            setExibirTabela(false);
            setAtualizando(true);
            setAgenciaAtual(agencia);
        }
        else
        {
            await fetch(urlAgencia, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(agencia)
            })
            .then(resposta => resposta.json())
            .then(retorno => {
                if (retorno.status)
                {
                    alert(retorno.mensagem);
                    setAtualizando(false);
                    setExibirTabela(true);
                    setAgenciaAtual(agenciaVazia);
                }
                else
                    alert(retorno.mensagem);
            })
            .catch(erro => {
                alert('Erro: ' + erro.message);
            });
        }
    }

    // Função para chamar a exclusão de uma agência no Backend
    async function excluirAgencia(agencia)
    {
        await fetch(urlAgencia, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({codigo: agencia.codigo})
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
        consultarAgencia();
    }

    if (exibirTabela) // Se a variável exibirTabela for verdadeira, exibe a tabela de agências
    {
        return (
            <div>
                <Pagina>
                    <h1 style={{ marginTop: '10px' }}>Tela de Cadastro de Agências</h1>
                    <br/>
                    <h2>Lista de Agências</h2>
                    <Button className='mb-3' onClick={() => {
                            setExibirTabela(false);
                        }}>
                        Cadastrar Agência
                    </Button>
                    <TabelaAgencia 
                        setExibirTabela={setExibirTabela}
                        listaAgencias={listaAgencias}
                        alterarAgencia={alterarAgencia}
                        excluirAgencia={excluirAgencia}
                    />
                </Pagina>
            </div>
        );
    }
    else // Se a variável exibirTabela for falsa, exibe o formulário de cadastro de agências
    {
        return (
            <div>
                <Pagina>
                    <h1 style={{ marginTop: '10px' }}>Tela de Cadastro de Agências</h1>
                    <br/>
                    <h2>Formulário de cadastro de Agências</h2>
                    <FormCadAgencia 
                        exibirTabela={exibirTabela}
                        setExibirTabela={setExibirTabela}
                        gravarAgencia={gravarAgencia}
                        alterarAgencia={alterarAgencia}
                        atualizando={atualizando}
                        setAtualizando={setAtualizando}
                        agencia={agenciaAtual}
                        setAgenciaAtual={setAgenciaAtual}
                        agenciaVazia={agenciaVazia}
                    />
                </Pagina>
            </div>
        );
    }
}
