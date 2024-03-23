import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useState } from 'react';

export default function FormCadAgencia(props) 
{
    const [validado, setValidado] = useState(false);
    const [agencia, setAgencia] = useState({
        cod_ag: 0,
        endereco: '',
        cidade: '',
        uf: '',
        telefone: ''
    });

    function manipularMudanca(evento) 
    {
        const componente = evento.currentTarget;
        setAgencia({ ...agencia, [componente.name]: componente.value });
    }

    function manipularSubmissao(evento) 
    {
        evento.preventDefault();
        evento.stopPropagation();
        const form = evento.currentTarget;
        if (form.checkValidity()===false) 
        {
            setValidado(true);
        }
        else
        {
            setValidado(false);
            fetch('http://localhost:4000/agencia', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(agencia)
            })
            .then(response => response.json())
            .then(retorno => {
                if (retorno.status) 
                {
                    alert(retorno.mensagem + ' Código gerado: ' + retorno.codigoGerado);
                    props.setListaProdutos([...props.setListaProdutos, agencia])
                    props.setExibirTabela(true);
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
    }
    
    return (
        <Form noValidate validated={validado} onSubmit={manipularSubmissao}>
            <Row className="mb-3">
                <Form.Group as={Col} md="5" controlId="validationCustom01">
                    <Form.Label>Endereço</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Endereço"
                        value={agencia.endereco}
                        id="endereco"
                        name="endereco"
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe o endereço!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="3" controlId="validationCustom02">
                    <Form.Label>Cidade</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Cidade"
                        id="cidade"
                        name="cidade"
                        value={agencia.cidade}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe a cidade!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="1" controlId="validationCustom03">
                    <Form.Label>UF</Form.Label>
                    <Form.Control 
                        required 
                        type="text" 
                        placeholder="UF" 
                        value={agencia.uf}
                        id="uf"
                        name="uf"
                        onChange={manipularMudanca}/>
                    <Form.Control.Feedback type="invalid">Por favor, informe a cidade!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row>
                <Form.Group as={Col} md="2">
                    <Form.Label>Telefone</Form.Label>
                    <Form.Control 
                        required 
                        type="text" 
                        placeholder="Telefone" 
                        value={agencia.telefone}
                        id="telefone"
                        name="telefone"
                        onChange={manipularMudanca}/>
                    <Form.Control.Feedback type="invalid">Por favor, informe o telefone!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Button type="submit">Gravar</Button>
            <Button onClick={() => {
                props.setExibirTabela(true);
            }}>Voltar</Button>
        </Form>
    );
}