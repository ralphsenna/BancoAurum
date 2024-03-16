import { Button, Col, Form, Row } from 'react-bootstrap';
import Pagina from '../templates/Pagina';
import { LinkContainer } from 'react-router-bootstrap';

export default function TelaAlterarAgencia() {
  return (
    <Pagina>
      <h2>Alteração de agência</h2>
      <br />
      <h4>Exibir dropdown com seleção do código da agência, cidade e UF</h4>
      <br />
      <Form>
        {/* ENDEREÇO */}
        <Form.Group className='mb-3' controlId='endereco' style={{ width: '340px' }}>
          <Form.Label>Novo endereço:</Form.Label>
          <Form.Control required type='endereco' />
          <Form.Control.Feedback type='invalid'>Informe o novo endereço da agência!</Form.Control.Feedback>
        </Form.Group>

        <Row>
          {/* BOTÃO DE CONFIRMAR ALTERAÇÕES */}
          <Col xs='auto'>
            <Button variant='dark' type='submit'>
              Confirmar alterações
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
