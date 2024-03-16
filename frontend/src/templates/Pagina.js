import { Container } from 'react-bootstrap';
import Cabecalho from './Cabecalho';

export default function Pagina(props) {
  return (
    <>
      <Cabecalho texto='BANCO AURUM' />
      <Container>{props.children}</Container>
    </>
  );
}
