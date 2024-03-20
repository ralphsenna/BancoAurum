import { Alert } from 'react-bootstrap';
import Pagina from '../Templates/Pagina.jsx';

export default function Tela404(props) {
    return (
        <Pagina>
            <Alert className='text-center' variant='danger'>
                <h3>A página que você tentou acessar não existe!</h3>
            </Alert>
        </Pagina>
    );
}
