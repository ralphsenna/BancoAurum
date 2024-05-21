import { Button, Col, Form, Row } from 'react-bootstrap';
import { useState } from 'react';

export default function FormCadProdutoAgencia(props) 
{
    // Define o estado do formulário e do produto que será cadastrado na agência
    const [validado, setValidado] = useState(true);
    const [produtoAgencia, setProdutoAgencia] = useState(props.produtoAgencia);

    // Função para manipular qualquer mudança de valores nos campos do formulário
    function manipularMudanca(evento) 
    {
        const componente = evento.currentTarget;
        if (componente.name==='agencia')
            setProdutoAgencia({...produtoAgencia, agencia: {"codigo": componente.value}});
        else if (componente.name==='produto')
            setProdutoAgencia({...produtoAgencia, produto: {"codigo": componente.value}});  
        else
            setProdutoAgencia({ ...produtoAgencia, [componente.name]: componente.value });
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
                props.gravarProdutoAgencia(produtoAgencia);
            else
                props.alterarProdutoAgencia(produtoAgencia);
        }
    }
    
    // Retorna o formulário de cadastro de agência e seus atributos para ser preenchido
    return (
        <Form noValidate validated={!validado} onSubmit={manipularSubmissao}>
            <Row className='mb-3'>
                {/* Agência Atual*/}
                <Form.Group as={Col} md='3'>
                    <Form.Label>Agência</Form.Label>
                    <Form.Select 
                        disabled={props.atualizando}
                        required={!props.atualizando}
                        value={produtoAgencia.agencia.codigo}
                        id='agencia' 
                        name='agencia'
                        onChange={manipularMudanca}
                    >
                        <option key={produtoAgencia.agencia.codigo} value={produtoAgencia.agencia.codigo}>({produtoAgencia.agencia.numero}) - {produtoAgencia.agencia.cidade}</option>
                    </Form.Select>
                </Form.Group>
                {/* Produto Aderido na Agência */}
                <Form.Group as={Col} md='3'>
                    <Form.Label>Produto</Form.Label>
                    <Form.Select 
                        value={produtoAgencia.produto.codigo}
                        id='produto' 
                        name='produto'
                        onChange={manipularMudanca}
                    >
                        {
                            props.listaProdutos[0].codigo!==0 ?
                            (
                                <><option key={0} value={''}>Selecione um produto</option>
                                {
                                    props.listaProdutos.map((produto) => {
                                        return (
                                            <option key={produto.codigo} value={produto.codigo}>({produto.tipo}) - {produto.nome}</option>
                                        );
                                    }) 
                                }</>
                            ): <option key={0} value={''}>{props.listaProdutos[0].nome}</option>
                        }
                    </Form.Select>
                    <Form.Control.Feedback type='invalid'>Por favor, informe a agência!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className='mb-3'>
                {/* Data do Contrato */}
                <Form.Group as={Col} md='2'>
                    <Form.Label>Data do Contrato</Form.Label>
                    <Form.Control
                        required
                        type='date'
                        placeholder=''
                        value={produtoAgencia.data_adesao}
                        id='data_adesao'
                        name='data_adesao'
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe a data do adesao!</Form.Control.Feedback>
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
                props.setProdutoAgenciaAtual(props.produtoAgenciaVazio);
            }}>Voltar</Button>
        </Form>
    )
}