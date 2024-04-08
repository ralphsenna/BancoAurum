import { useContext } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { ContextoUsuario } from '../App';

export default function TelaLogin() 
{
    // Variáveis de estado para armazenar o nome do usuário, senha e a alteração desses valores
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
        if (usuario.nome==='adminaurum' && usuario.senha==='admin')
            setUsuario(prevUsuario => ({
                ...prevUsuario,
                logado: true
            }));
    }
    
    return (
        <Container className='d-flex align-items-center justify-content-center w-50'>
            <Form className='mt-5' onSubmit={realizarLogin}>
                {/* Formulário do nome de usuário */}
                <Form.Group className='mb-3'>
                    <Form.Label>Usuário</Form.Label>
                    <Form.Control 
                        type='text'  
                        id='nome' 
                        name='nome'
                        value={usuario.nome}
                        onChange={manipulaMudanca}
                    />
                </Form.Group>
                {/* Formulário de senha */}
                <Form.Group className='mb-3'>
                    <Form.Label>Senha</Form.Label>
                    <Form.Control 
                        type='password' 
                        id='senha' 
                        name='senha'  
                        value={usuario.senha}
                        onChange={manipulaMudanca}
                    />
                </Form.Group>
                {/* Botão de entrar */}
                <Button variant='primary' type='submit'>
                    Entrar
                </Button>
            </Form>
        </Container>
    );
}
