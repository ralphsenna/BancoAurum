import { Button, Container, Form } from 'react-bootstrap';
import { useContext } from 'react';
import ContextoUsuario from '../App';

export default function TelaLogin() 
{
    // Criação de um contexto para acessar o usuário logado
    const [usuario, setUsuario] = useContext(ContextoUsuario);

    // Função para manipular a mudança de valores nos campos de usuário e senha
    function manipulaMudanca(evento)
    {
        const {id, value} = evento.target;
        setUsuario(prevUsuario => ({
            ...prevUsuario,
            [id]: value
        }));
    }

    // Função para realizar o login
    function realizarLogin(evento)
    {
        evento.preventDefault();
        if (usuario.email==='adminaurum@admin' && usuario.senha==='admin')
            setUsuario(prevUsuario => ({
                ...prevUsuario,
                logado: true
            }));
    }
    
    // Renderiza a tela de login
    return (
        <Container className='d-flex align-items-center justify-content-center w-50'>
            <Form className='mt-5' onSubmit={realizarLogin}>
                {/* E-mail do usuário */}
                <Form.Group className='mb-3'>
                    <Form.Label>Usuário</Form.Label>
                    <Form.Control 
                        required
                        type='text'  
                        id='email' 
                        name='email'
                        placeholder='usuario@provedor.com'
                        value={usuario.email}
                        onChange={manipulaMudanca}
                    />
                </Form.Group>
                {/* Senha do usuário */}
                <Form.Group className='mb-3'>
                    <Form.Label>Senha</Form.Label>
                    <Form.Control 
                        required
                        type='password' 
                        id='senha' 
                        name='senha'  
                        placeholder=''
                        value={usuario.senha}
                        onChange={manipulaMudanca}
                    />
                </Form.Group>
                {/* Botão para entrar na conta do usuário */}
                <Button variant='primary' type='submit'>
                    Entrar
                </Button>
            </Form>
        </Container>
    );
}
