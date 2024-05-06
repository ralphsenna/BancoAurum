import { Button, Col, Form, Row } from 'react-bootstrap';
import { useState } from 'react';

export default function FormCadAgencia(props) 
{
    // Define o estado do formulário e da agência
    const [validado, setValidado] = useState(true);
    const [agencia, setAgencia] = useState(props.agencia);

    // Função para manipular qualquer mudança de valores nos campos do formulário
    function manipularMudanca(evento) 
    {
        const componente = evento.currentTarget;
        setAgencia({ ...agencia, [componente.name]: componente.value });
    }

    // Função para enviar os dados do formulário para gravação/alteração caso estejam válidos
    function manipularSubmissao(evento) 
    {
        evento.preventDefault();
        evento.stopPropagation();
        const form = evento.currentTarget;
        if (!form.checkValidity()) 
            setValidado(false);
        else
        {
            setValidado(true);
            if (!props.atualizando)
                props.gravarAgencia(agencia);
            else
                props.alterarAgencia(agencia);
        }
    }
    
    // Retorna o formulário de cadastro de agência e seus atributos para ser preenchido
    return (
        <Form noValidate validated={!validado} onSubmit={manipularSubmissao}>
            <Row className='mb-3'>
                {/* Código da Agência */}
                <Form.Group as={Col} md='1'>
                    <Form.Label>Código</Form.Label>
                    <Form.Control
                        disabled
                        type='number'
                        placeholder='0'
                        value={agencia.codigo}
                        id='codigo'
                        name='codigo'
                        onChange={manipularMudanca}
                    />
                </Form.Group>
            </Row>
            <Row className='mb-3'>
                {/* Número da Agência */}
                <Form.Group as={Col} md='2'>
                    <Form.Label>N° da Agência</Form.Label>
                    <Form.Control
                        required
                        type='number'
                        placeholder='Número'
                        value={agencia.numero}
                        id='numero'
                        name='numero'
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe o número!</Form.Control.Feedback>
                </Form.Group>
                {/* Telefone da Agência */}
                <Form.Group as={Col} md='3'>
                    <Form.Label>Telefone</Form.Label>
                    <Form.Control 
                        required 
                        type='text' 
                        placeholder='Telefone' 
                        value={agencia.telefone}
                        id='telefone'
                        name='telefone'
                        onChange={manipularMudanca}/>
                    <Form.Control.Feedback type='invalid'>Por favor, informe o telefone!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className='mb-3'>
                {/* CEP da Agência */}
                <Form.Group as={Col} md='1'>
                    <Form.Label>CEP</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='CEP'
                        value={agencia.cep}
                        id='cep'
                        name='cep'
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe o CEP!</Form.Control.Feedback>
                </Form.Group>
                {/* Endereço da Agência */}
                <Form.Group as={Col} md='4'>
                    <Form.Label>Endereço</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Endereço'
                        value={agencia.endereco}
                        id='endereco'
                        name='endereco'
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe o endereço!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className='mb-3'>
                {/* Cidade e UF da Agência */}
                <Form.Group as={Col} md='3'>
                    <Form.Label>Cidade</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Cidade'
                        value={agencia.cidade}
                        id='cidade'
                        name='cidade'
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe a cidade!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md='1'>
                    <Form.Label>UF</Form.Label>
                    <Form.Control 
                        required 
                        type='text' 
                        placeholder='UF' 
                        value={agencia.uf}
                        id='uf'
                        name='uf'
                        onChange={manipularMudanca}/>
                    <Form.Control.Feedback type='invalid'>Por favor, informe o estado!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className='mb-3'>
                {/* E-mail da Agência */}
                <Form.Group as={Col} md='4'>
                    <Form.Label>E-mail</Form.Label>
                    <Form.Control 
                        required 
                        type='email' 
                        placeholder='E-mail' 
                        value={agencia.email}
                        id='email'
                        name='email'
                        onChange={manipularMudanca}/>
                    <Form.Control.Feedback type='invalid'>Por favor, informe o e-mail!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            {/* Botões para Gravar/Alterar e Voltar para a lista de agências */}
            <Button style={{marginRight:'5px'}} type='submit'>
                {props.atualizando ? 'Atualizar' : 'Gravar'}
            </Button>
            <Button onClick={() => {
                if (props.atualizando)
                    props.setAtualizando(false);
                props.setExibirTabela(true);
                props.setAgenciaAtual(props.agenciaVazia);
            }}>Voltar</Button>
        </Form>
    )
}