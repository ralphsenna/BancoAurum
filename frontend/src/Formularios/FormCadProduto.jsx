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
        setProduto({...produto, [componente.name]: componente.value});
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
                        value={produto.codigo}
                        name='codigo'
                        onChange={manipularMudanca}
                    />
                </Form.Group>
            </Row>  
            <Row className='mb-3'>
                {/* Tipo do Produto */}
                <Form.Group as={Col} md='2'>
                    <Form.Label>Tipo</Form.Label>
                    <Form.Select
                        required
                        value={produto.tipo}
                        name='tipo'
                        onChange={manipularMudanca}
                    >
                        <option key={0} value={''}>Selecione o tipo</option>
                        <option key={1} value={'Cartão de Débito'}>Cartão de Débito</option>
                        <option key={2} value={'Cartão de Crédito'}>Cartão de Crédito</option>
                        <option key={3} value={'Seguro'}>Seguro</option>
                        <option key={4} value={'Empréstimo'}>Empréstimo</option>
                        <option key={5} value={'Financiamento'}>Financiamento</option>
                    </Form.Select>
                </Form.Group>
                {/* Nome do Produto */}
                <Form.Group as={Col} md='3'>
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Nome do Produto'
                        value={produto.nome}
                        name='nome'
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type='invalid'>Informe o nome do produto!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            {produto.tipo==='Cartão de Crédito' && (
            <Row className='mb-3'>
                {/* Limite do Produto */}
                <Form.Group as={Col} md='1'>
                    <Form.Label>Limite</Form.Label>
                    <Form.Control
                        type='number'
                        placeholder='0'
                        value={produto.limite}
                        name='limite'
                        onChange={manipularMudanca}
                    />
                </Form.Group>
            </Row>
            )}
            {(produto.tipo==='Seguro' || 
            produto.tipo==='Empréstimo' || produto.tipo==='Financiamento') && (
            <Row className='mb-3'>  
                {/* Valor do Produto */}
                <Form.Group as={Col} md='1'>
                    <Form.Label>Valor</Form.Label>
                    <Form.Control
                        type='number'
                        placeholder='0'
                        value={produto.valor}
                        name='valor'
                        onChange={manipularMudanca}
                    />
                </Form.Group>
                {produto.tipo!=='Seguro' && (
                    /* Juros do Produto (%) */
                    <Form.Group as={Col} md='1'>
                        <Form.Label>Juros</Form.Label>
                        <Form.Control
                            type='number'
                            placeholder='0'
                            value={produto.juros}
                            name='juros'
                            onChange={manipularMudanca}
                        />
                    </Form.Group>
                )}
            </Row>
            )}
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