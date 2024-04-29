import { Alert, Nav } from 'react-bootstrap';
import { useContext } from 'react';
import { ContextoUsuario } from '../App';

export default function Cabecalho(props) 
{
    // Criação de um contexto para acessar o usuário logado
    const [usuario, setUsuario] = useContext(ContextoUsuario);
    
    // Renderiza o cabeçalho da aplicação
    return (
        <div>
            <Alert variant='dark' className='text-center' style={{marginBottom: '0'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <div style={{flex: 1}}/>
                    <h1>{props?.texto}</h1>
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end', flex: 1}}>
                        <span>Usuário: {usuario?.email}</span>
                        <Nav.Link href='#' style={{color: 'red', textDecoration: 'underline'}} onClick={() => {
                            setUsuario({usuario: '', senha: '', logado: false})
                        }}>
                            Sair
                        </Nav.Link>
                    </div>
                </div>
            </Alert>
        </div>
    );
}
