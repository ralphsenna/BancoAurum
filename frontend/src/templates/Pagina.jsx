import { Container } from 'react-bootstrap';
import Cabecalho from './Cabecalho';
import Menu from './Menu';

export default function Pagina(props) 
{
    // Renderiza a página principal da aplicação
    return (
        <div>
            <Cabecalho texto='Banco Aurum'/>
            <Menu style={{marginTop: '0'}}/>
            <Container fluid style={{padding: '0 50px'}}>{props.children}</Container>
        </div>
    );
}
