import { Container } from 'react-bootstrap';
import Cabecalho from './Cabecalho';
import Menu from './Menu';

export default function Pagina(props) 
{
    return (
        <div>
            <Cabecalho texto='Banco Aurum'/>
            <Menu/>
            <Container>{props.children}</Container>
        </div>
    );
}
