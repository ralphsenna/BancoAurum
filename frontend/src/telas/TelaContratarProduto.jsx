import { Button, Col, Form, Row } from 'react-bootstrap';
import Pagina from '../templates/Pagina';
import { LinkContainer } from 'react-router-bootstrap';

export default function TelaContratarProduto() {
  return (
    <Pagina>
      <h2>Contratar produto</h2>
      <h4>Exibir dropdown com lista de clientes para utilizar no formulário de contratar produto</h4>
      <h4>Exibir dropdown com lista de produtos disponíveis</h4>
      <br />
      <Form>
        {/* <Form.Group className='mb-3' controlId='endereco' style={{ width: '340px' }}>
          <Form.Label>Endereço:</Form.Label>
          <Form.Control required type='endereco' id='endereco' />
          <Form.Control.Feedback type='invalid'>Informe o endereço do cliente!</Form.Control.Feedback>
        </Form.Group> */}
        {/* CIDADE */}
        {/* <Form.Group className='mb-3' controlId='cidade' style={{ width: '340px' }}>
          <Form.Label>Cidade:</Form.Label>
          <Form.Control required type='cidade' id='cidade' />
          <Form.Control.Feedback type='invalid'>Informe a cidade do cliente!</Form.Control.Feedback>
        </Form.Group> */}
        {/* UF */}
        {/* <Form.Group className='mb-3' controlId='uf'>
          <Form.Label style={{ width: '50px' }}>UF:</Form.Label>
          <select className='mb-3' id='uf'>
            <option></option>
            <option value='AC'>AC</option>
            <option value='AL'>AL</option>
            <option value='AP'>AP</option>
            <option value='AM'>AM</option>
            <option value='BA'>BA</option>
            <option value='CE'>CE</option>
            <option value='ES'>ES</option>
            <option value='GO'>GO</option>
            <option value='MA'>MA</option>
            <option value='MT'>MT</option>
            <option value='MS'>MS</option>
            <option value='MG'>MG</option>
            <option value='PA'>PA</option>
            <option value='PB'>PB</option>
            <option value='PR'>PR</option>
            <option value='PE'>PE</option>
            <option value='PI'>PI</option>
            <option value='RJ'>RJ</option>
            <option value='RN'>RN</option>
            <option value='RS'>RS</option>
            <option value='RO'>RO</option>
            <option value='RR'>RR</option>
            <option value='SC'>SC</option>
            <option value='SP'>SP</option>
            <option value='SE'>SE</option>
            <option value='TO'>TO</option>
            <option value='DF'>DF</option>
          </select>
        </Form.Group> */}
        {/* EMAIL */}
        {/* <Form.Group className='mb-3' controlId='email' style={{ width: '340px' }}>
          <Form.Label>Novo email:</Form.Label>
          <Form.Control required type='email' />
          <Form.Control.Feedback type='invalid'>Informe o novo email do cliente!</Form.Control.Feedback>
        </Form.Group> */}
        {/* TELEFONE */}
        {/* <Form.Group className='mb-3' controlId='telefone' style={{ width: '140px' }}>
          <Form.Label>Novo telefone:</Form.Label>
          <Form.Control required type='number' />
          <Form.Control.Feedback type='invalid'>Informe o novo telfone do cliente!</Form.Control.Feedback>
        </Form.Group> */}
        {/* SENHA */}
        {/* <Col md='2'>
          <Form.Group className='mb-3' controlId='formSenha' style={{ width: '150px' }}>
            <Form.Label>Nova senha:</Form.Label>
            <Form.Control required type='password' />
          </Form.Group>
        </Col> */}
        <br />
        <Row>
          {/* BOTÃO DE CONFIRMAR ALTERAÇÕES */}
          <Col xs='auto'>
            <Button variant='dark' type='submit'>
              Contratar produto
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
      <br />
    </Pagina>
  );
}
