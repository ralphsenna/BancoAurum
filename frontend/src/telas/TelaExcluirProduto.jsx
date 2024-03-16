import { Button, Col, Form, Row } from 'react-bootstrap';
import Pagina from '../templates/Pagina';
import { LinkContainer } from 'react-router-bootstrap';

export default function TelaExcluirProduto() {
  return (
    <Pagina>
      <h2>Exclusão de Produto</h2>
      <br />
      <Form>
        <Row>
          {/* CÓDIGO */}
          <Col xs={2}>
            <Form.Group controlId='cod_prod'>
              <Form.Label>Digite o código do produto que deseja excluir:</Form.Label>
              <Form.Control required type='number' />
              <Form.Control.Feedback type='invalid'>Informe o código do produto!</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <br />
        <Row>
          {/* BOTÃO DE CONFIRMAR EXCLUSÃO */}
          <Col xs='auto'>
            <Button variant='danger' type='submit'>
              Confirmar exclusão
            </Button>
          </Col>

          {/* BOTÃO DE CANCELAR */}
          <Col xs='auto'>
            <LinkContainer to='/'>
              <Button variant='secondary' type='submit'>
                Cancelar
              </Button>
            </LinkContainer>
          </Col>
        </Row>
      </Form>
    </Pagina>
  );
}
