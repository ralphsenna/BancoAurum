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
        cod_ag: 0,
        endereco: '',
        cidade: '',
        uf: '',
        telefone: ''
    };
    const [agenciaAtual, setAgenciaAtual] = useState(agenciaVazia);

    // Função para chamar a consulta de agências no Backend
    async function consultarAgencia()
    {
        await fetch(urlAgencia, {method: 'GET'})
        .then(resposta => resposta.json())
        .then(retorno => {
            if (retorno.status)
            {
                setListaAgencias(retorno.listaAgencias);
            }
            else
            {
                alert(retorno.mensagem);
            }
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
                alert(retorno.mensagem + ' Código do agência: ' + retorno.codigoGerado);                   
            }
            else
            {
                alert(retorno.mensagem);
            }
        })
        .catch(erro => {
            alert('Erro: ' + erro.message);
        });
        setExibirTabela(true);
        setAgenciaAtual(agenciaVazia);
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
                }
                else
                {
                    alert(retorno.mensagem);
                }
            })
            .catch(erro => {
                alert('Erro: ' + erro.message);
            });
            setAtualizando(false);
            setExibirTabela(true);
            setAgenciaAtual(agenciaVazia);
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
            body: JSON.stringify({cod_ag: agencia.cod_ag})
        })
        .then(resposta => resposta.json())
        .then(retorno => {
            if (retorno.status)
            {
                alert(retorno.mensagem);
            }
            else
            {
                alert(retorno.mensagem);
            }
        })
        .catch(erro => {
            alert('Erro: ' + erro.message);
        });
        consultarAgencia();
    }

    // Se a variável exibirTabela for verdadeira, exibe a tabela de agências
    if (exibirTabela)
    {
        return (
            <div>
                <Pagina>
                    <h2 style={{ marginTop: '10px' }}>Tela de Cadastro de Agências</h2>
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
        )
    }
    // Se a variável exibirTabela for falsa, exibe o formulário de cadastro de agências
    else
    {
        return (
            <div>
                <Pagina>
                    <h1>Tela de Cadastro de Agências</h1>
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
        )   
    }

    /* return (
        <>
            <Pagina>
                <h2>Cadastro de nova agência</h2>
                <br />
                <Form noValidate validated={validado} onSubmit={manipulaSubmissao}>
                    
                    <Form.Group className='mb-3' controlId='endereco' style={{ width: '340px' }}>
                        <Form.Label>Endereço:</Form.Label>
                        <Form.Control required type='text' id='endereco' value={agencia.endereco} onChange={manipularMudanca} />
                        <Form.Control.Feedback type='invalid'>Informe o endereço da agência!</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='cidade' style={{ width: '340px' }}>
                        <Form.Label>Cidade:</Form.Label>
                        <Form.Control required type='email' id='cidade' value={agencia.cidade} onChange={manipularMudanca} />
                        <Form.Control.Feedback type='invalid'>Informe a cidade da agência!</Form.Control.Feedback>
                    </Form.Group>

                    <Row>
                        <Col md='2'>
                            <Form.Group className='mb-3' controlId='uf'>
                                <Form.Label style={{ width: '50px' }}>UF:</Form.Label>
                                <select className='mb-3' style={{ width: '60px' }} id='uf'>
                                    <option></option>
                                    <option value='AC'>AC</option>
                                    <option value='AL'>AL</option>
                                    <option value='AP'>AP</option>
                                    <option value='AM'>AM</option>
                                    <option value='BA'>BA</option>
                                    <option value='CE'>CE</option>
                                    <option value='ES'>ES</option>
                                    <option value='GO'>GO</option>
                                    <option value='MA'>MA</option>
                                    <option value='MT'>MT</option>
                                    <option value='MS'>MS</option>
                                    <option value='MG'>MG</option>
                                    <option value='PA'>PA</option>
                                    <option value='PB'>PB</option>
                                    <option value='PR'>PR</option>
                                    <option value='PE'>PE</option>
                                    <option value='PI'>PI</option>
                                    <option value='RJ'>RJ</option>
                                    <option value='RN'>RN</option>
                                    <option value='RS'>RS</option>
                                    <option value='RO'>RO</option>
                                    <option value='RR'>RR</option>
                                    <option value='SC'>SC</option>
                                    <option value='SP'>SP</option>
                                    <option value='SE'>SE</option>
                                    <option value='TO'>TO</option>
                                    <option value='DF'>DF</option>
                                </select>
                                {/* <Dropdown.Toggle required id='uf'>
                  akjsdh
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href='AC'>AC</Dropdown.Item>
                  <Dropdown.Item>AL</Dropdown.Item>
                  <Dropdown.Item>AP</Dropdown.Item>
                  <Dropdown.Item>AM</Dropdown.Item>
                  <Dropdown.Item>BA</Dropdown.Item>
                  <Dropdown.Item>CE</Dropdown.Item>
                  <Dropdown.Item>ES</Dropdown.Item>
                  <Dropdown.Item>GO</Dropdown.Item>
                  <Dropdown.Item>MA</Dropdown.Item>
                  <Dropdown.Item>MT</Dropdown.Item>
                  <Dropdown.Item>MS</Dropdown.Item>
                  <Dropdown.Item>MG</Dropdown.Item>
                  <Dropdown.Item>PA</Dropdown.Item>
                  <Dropdown.Item>PB</Dropdown.Item>
                  <Dropdown.Item>PR</Dropdown.Item>
                  <Dropdown.Item>PE</Dropdown.Item>
                  <Dropdown.Item>PI</Dropdown.Item>
                  <Dropdown.Item>RJ</Dropdown.Item>
                  <Dropdown.Item>RN</Dropdown.Item>
                  <Dropdown.Item>RS</Dropdown.Item>
                  <Dropdown.Item>RO</Dropdown.Item>
                  <Dropdown.Item>RR</Dropdown.Item>
                  <Dropdown.Item>SC</Dropdown.Item>
                  <Dropdown.Item>SP</Dropdown.Item>
                  <Dropdown.Item>SE</Dropdown.Item>
                  <Dropdown.Item>TO</Dropdown.Item>
                  <Dropdown.Item>DF</Dropdown.Item>
                </Dropdown.Menu> 
                                <Form.Control.Feedback type='invalid'>Informe o estado da agência!</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    <br />
                    <Row>
                        <Col xs='auto'>
                            <Button variant='dark' type='submit'>
                                Cadastrar agência
                            </Button>
                        </Col>

                        <Col xs='auto'>
                            <LinkContainer to='/'>
                                <Button variant='secondary'>Cancelar</Button>
                            </LinkContainer>
                        </Col>
                    </Row>
                </Form>
            </Pagina>
        </>
    ); */
}
