import { useEffect, useState } from 'react';
import Pagina from '../Templates/Pagina.jsx';
import TabelaAgencia from '../Tabelas/TabelaAgencia';
import FormCadAgencia from '../Formularios/FormCadAgencia';

const url = 'http://localhost:4000/agencia';

export default function TelaCadastroAgencia(props)
{
    const [exibirTabela, setExibirTabela] = useState(true);
    const [listaAgencias, setListaAgencias] = useState([]);

    function buscarAgencias()
    {
        fetch(url, {method: 'GET'})
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

    useEffect(() => {
        buscarAgencias();
    }, [listaAgencias]);

    if (exibirTabela)
    {
        return (
            <div>
                <Pagina>
                    <h2>Tela de Cadastro de Agências</h2>
                    <br/>
                    <h2>Lista de Agências</h2>
                    <TabelaAgencia listaAgencias={listaAgencias} setExibirTabela={setExibirTabela}/>
                </Pagina>
            </div>
        );
    }
    else
    {
        return (
            <div>
                <Pagina>
                    <h1>Tela de Cadastro de Agências</h1>
                    <br/>
                    <h2>Formulário de cadastro de Agências</h2>
                    <FormCadAgencia 
                        setExibirTabela={setExibirTabela}
                        listaAgencias={listaAgencias}
                        setListaAgencias={setExibirTabela}
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
