import { Button, Col, Form, Row } from 'react-bootstrap';
import Pagina from '../templates/Pagina';
import { LinkContainer } from 'react-router-bootstrap';

export default function TelaExcluirCliente() {
  return (
    <Pagina>
      <h2>Exclusão de cliente</h2>
      <br />
      <Form>
        {/* CÓDIGO DE CLIENTE */}
        <Form.Group className='mb-3' controlId='cod_cli' style={{ width: '200px' }}>
          <Form.Label>Digite o código do cliente que deseja excluir:</Form.Label>
          <Form.Control required type='text' />
          {/* <Form.Control.Feedback type='invalid'>Informe o CPF do cliente a ser excluído!</Form.Control.Feedback> */}
        </Form.Group>
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
