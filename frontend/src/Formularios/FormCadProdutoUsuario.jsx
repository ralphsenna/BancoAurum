import { Button, Col, Form, Row } from 'react-bootstrap';
import { useState } from 'react';

export default function FormCadProdutoUsuario(props)
{
    // Define o estado do formulário e do produto que será cadastrado no usuário
    const [validado, setValidado] = useState(true);
    const [produtoUsuario, setProdutoUsuario] = useState(props.produtoUsuario);

    // Função para manipular qualquer mudança de valores nos campos do formulário
    function manipularMudanca(evento) 
    {
        const componente = evento.currentTarget;
        if (componente.name==='usuario')
            setProdutoUsuario({...produtoUsuario, usuario: {"codigo": componente.value}});
        else if (componente.name==='produto')
        {
            const codigoProduto = parseInt(componente.value);
            const produtoSelecionado = props.listaProdutos.find(produto => produto.produto.codigo===codigoProduto);
            if (componente.value!=='')
            {
                if (produtoSelecionado.produto.tipo==='Empréstimo' || produtoSelecionado.produto.tipo==='Financiamento' || produtoSelecionado.produto.tipo==='Seguro') 
                {
                    let valorFinal;
                    if (produtoSelecionado.produto.tipo!=='Seguro')
                        valorFinal = parseFloat(produtoSelecionado.produto.valor+produtoSelecionado.produto.valor*(produtoSelecionado.produto.juros/100).toFixed(2));
                    else
                        valorFinal = produtoSelecionado.produto.valor;
                    setProdutoUsuario({...produtoUsuario, produto: produtoSelecionado.produto, valor_final: valorFinal});
                }
                else
                    setProdutoUsuario({...produtoUsuario, produto: produtoSelecionado.produto});
            }
            else
                setProdutoUsuario({...produtoUsuario, produto: {"codigo": componente.value}});
        }
        else
            setProdutoUsuario({ ...produtoUsuario, [componente.name]: componente.value });
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
                props.gravarProdutoUsuario(produtoUsuario);
            else
                props.alterarProdutoUsuario(produtoUsuario);
        }
    }
    
    // Retorna o formulário de cadastro de produto em usuário e seus atributos para ser preenchido
    return (
        <Form noValidate validated={!validado} onSubmit={manipularSubmissao}>
            <Row className='mb-3'>
                {/* Usuário Atual*/}
                <Form.Group as={Col} md='3'>
                    <Form.Label>Usuário</Form.Label>
                    <Form.Select 
                        disabled
                        value={produtoUsuario.usuario.codigo}
                        id='usuario' 
                        name='usuario'
                        onChange={manipularMudanca}
                    >
                        <option key={produtoUsuario.usuario.codigo} value={produtoUsuario.usuario.codigo}>{produtoUsuario.usuario.nome}</option>
                    </Form.Select>
                </Form.Group>
                {/* Produto Contratado pelo Usuário */}
                <Form.Group as={Col} md='3'>
                    <Form.Label>Produto</Form.Label>
                    <Form.Select 
                        disabled={props.atualizando}
                        required={!props.atualizando}
                        value={produtoUsuario.produto.codigo}
                        id='produto' 
                        name='produto'
                        onChange={manipularMudanca}
                    >
                        {
                            props.listaProdutos[0].produto.codigo!==0 ?
                            (
                                <><option key={0} value={''}>Selecione um produto</option>
                                {
                                    props.listaProdutos.map((produtoUsuario) => {
                                        return (
                                            <option key={produtoUsuario.produto.codigo} value={produtoUsuario.produto.codigo}>({produtoUsuario.produto.tipo}) - {produtoUsuario.produto.nome}</option>
                                        );
                                    }) 
                                }</>
                            ): <option key={0} value={''}>{props.listaProdutos[0].produto.nome}</option>
                        }
                    </Form.Select>
                    <Form.Control.Feedback type='invalid'>Por favor, informe o produto!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className='mb-3'>
                {/* Data do Contrato */}
                <Form.Group as={Col} md='2'>
                    <Form.Label>Data da Contratação</Form.Label>
                    <Form.Control
                        required
                        type='date'
                        placeholder=''
                        value={produtoUsuario.data_contratacao}
                        id='data_contratacao'
                        name='data_contratacao'
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe a data da contratação!</Form.Control.Feedback>
                </Form.Group>
                {produtoUsuario.produto.tipo==='Cartão de Crédito' && (
                <Form.Group as={Col} md='2'>
                    {/* Saldo do Produto */}
                    <Form.Label>Saldo</Form.Label>
                    <Form.Control
                        required
                        type='number'
                        placeholder='Saldo'
                        value={produtoUsuario.saldo}
                        id='saldo'
                        name='saldo'
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe o saldo!</Form.Control.Feedback>
                </Form.Group>
                )}
                {(produtoUsuario.produto.tipo==='Empréstimo' ||
                  produtoUsuario.produto.tipo==='Financiamento' || 
                  produtoUsuario.produto.tipo==='Seguro') && (              
                <Form.Group as={Col} md='2'>
                    {/* Valor Final do Produto com Juros */}
                    <Form.Label>Valor Final</Form.Label>
                    <Form.Control
                        disabled
                        type='number'
                        placeholder='Valor Final'
                        value={produtoUsuario.valor_final}
                        id='valor_final'
                        name='valor_final'
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe o valor final!</Form.Control.Feedback>
                </Form.Group>
                )}
            </Row>
            {/* Botões para Gravar/Alterar e Voltar para a lista de produtos do usuário */}
            <Button style={{marginRight:'5px'}} type='submit'>
                {props.atualizando ? 'Atualizar' : 'Gravar'}
            </Button>
            <Button onClick={() => {
                if (props.atualizando)
                    props.setAtualizando(false);
                props.setExibirTabela(true);
                props.setProdutoUsuarioAtual(props.produtoUsuarioVazio);
            }}>Voltar</Button>
        </Form>
    )
}