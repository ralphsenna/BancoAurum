import { Alert } from 'react-bootstrap';
import { useContext } from 'react';
import { Nav } from 'react-bootstrap';
import { ContextoUsuario } from '../App';

export default function Cabecalho(props) 
{
    const [usuario, setUsuario] = useContext(ContextoUsuario);
    
    return (
        <div>
            <Alert variant='dark' className='text-center'>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <div style={{ flex: 1 }}></div>
                <h1>{props?.texto}</h1>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', flex: 1 }}>
                    <span>Usuário: {usuario?.nome}</span>
                    <Nav.Link href="#" style={{ color: 'red', textDecoration: 'underline' }} onClick={() => {
                            setUsuario({ usuario: '', senha: '', logado: false})
                        }}>
                        Sair
                    </Nav.Link>
                </div>
            </div>
            </Alert>
        </div>
    );
}
