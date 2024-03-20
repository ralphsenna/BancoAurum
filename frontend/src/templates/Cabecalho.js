import { Alert } from 'react-bootstrap';
import { ContextoUsuario } from '../Templates/Contexto';
import { useContext } from 'react';

export default function Cabecalho(props) 
{
    const [usuario, setUsuario] = useContext(ContextoUsuario);
    return (
        <div>
            <Alert variant='dark' className='text-center'>
                <h1>{props?.texto}</h1>
                <span className='text-end'>Usuário: {usuario?.nome}</span>
            </Alert>
        </div>
    );
}
