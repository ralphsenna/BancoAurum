import { Button, Col, Form, Row } from 'react-bootstrap';
import { useState } from 'react';

export default function FormCadProduto(props) 
{
    // Define o estado do formulário e do produto
    const [validado, setValidado] = useState(true);
    const [produto, setProduto] = useState(props.produto);

    // Função para manipular qualquer mudança de valores nos campos do formulário
    function manipularMudanca(evento) 
    {
        const componente = evento.currentTarget;
        setProduto({ ...produto, [componente.name]: componente.value });
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
                props.gravarProduto(produto);
            else
                props.alterarProduto(produto);
        }
    }
    
    // Retorna o formulário de cadastro de produto e seus atributos para ser preenchido
    return (
        <Form noValidate validated={!validado} onSubmit={manipularSubmissao}>
            <Row className='mb-3'>
                {/* Código do Produto */}
                <Form.Group as={Col} md='1'>
                    <Form.Label>Código</Form.Label>
                    <Form.Control
                        disabled
                        type='number'
                        placeholder='0'
                        value={produto.cod_ag}
                        id='cod_ag'
                        name='cod_ag'
                        onChange={manipularMudanca}
                    />
                </Form.Group>
            </Row>
            <Row className='mb-3'>
                {/* Descrição do Produto */}
                <Form.Group as={Col} md='4'>
                    <Form.Label>Descrição</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Descrição'
                        value={produto.descricao}
                        id='descricao'
                        name='descricao'
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe o descrição!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            {/* Botões para Gravar/Alterar e Voltar para a lista de produtos */}
            <Button style={{marginRight:'5px'}} type='submit'>
                {props.atualizando ? 'Atualizar' : 'Gravar'}
            </Button>
            <Button onClick={() => {
                if (props.atualizando)
                    props.setAtualizando(false);
                props.setExibirTabela(true);
                props.setProdutoAtual(props.produtoVazio);
            }}>Voltar</Button>
        </Form>
    )
}