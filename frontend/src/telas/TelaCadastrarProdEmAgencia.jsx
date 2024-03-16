import { Button, Col, Dropdown, Form, Row } from 'react-bootstrap';
import Pagina from '../templates/Pagina';
import { LinkContainer } from 'react-router-bootstrap';
import { useState } from 'react';
import listaProdutos from '../dados/mockProdutos';
// import listaContas from '../dados/mockContas.js';

export default function TelaCadastrarProdEmAgencia(props) {
  const [validado, setValidado] = useState(false);
  const [produto, setProduto] = useState({
    cod_prod: '',
    nome: '',
  });

  function manipularMudanca(e) {
    const elemForm = e.currentTarget;
    const id = elemForm.id;
    const valor = elemForm.value;
    setProduto({ ...produto, [id]: valor });
  }

  function manipulaSubmissao(e) {
    const form = e.currentTarget;
    if (form.checkValidity()) {
      // dados válidos → proceder com o cadastro
      let produtos = props.listaProdutos;
      produtos.push(produto);
      props.setProduto(produtos);
      setValidado(false);
      // não encontrei exibirTabela em nenhum lugar
      props.exibirTabela(true);
    } else {
      setValidado(true);
    }
    e.preventDefault();
    e.stopPropagation();
  }

  //
  // RETURN
  //
  return (
    <>
      <Pagina>
        <h2>Cadastro de novo produto</h2>
        <br />
        <Form noValidate validated={validado} onSubmit={manipulaSubmissao}>
          <Row>
            {/* NOME DO PRODUTO */}
            <Col xs={4}>
              <Form.Group controlId='cod_prod'>
                <Form.Label>Nome do produto:</Form.Label>
                <Form.Control required type='text' id='nome' value={produto.nome} onChange={manipularMudanca} />
                <Form.Control.Feedback type='invalid'>Informe o nome do produto!</Form.Control.Feedback>
              </Form.Group>
            </Col>

            {/* AGÊNCIA */}
            <Col xs={2}>
              <Form.Group controlId='cod_ag'>
                <Form.Label>Código da agência:</Form.Label>
                <Form.Control required type='number' id='cod_ag' value={produto.nome} onChange={manipularMudanca} />
                <Form.Control.Feedback type='invalid'>Informe o código da agência!</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <br />

          <Row>
            {/* BOTÃO DE CADASTRAR */}
            <Col xs='auto'>
              <Button variant='dark' type='submit'>
                Cadastrar produto na agência selecionada
              </Button>
            </Col>

            {/* BOTÃO DE CANCELAR */}
            <Col xs='auto'>
              <LinkContainer to='/'>
                <Button variant='secondary'>Cancelar</Button>
              </LinkContainer>
            </Col>
          </Row>
          <br />
        </Form>
      </Pagina>
    </>
  );
}
