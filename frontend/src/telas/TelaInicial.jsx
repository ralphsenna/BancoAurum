import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Container, Nav, NavDropdown } from 'react-bootstrap';
import { useContext } from 'react';
import { ContextoUsuario } from '../Templates/Contexto';
import 'bootstrap/dist/css/bootstrap.min.css';
import Pagina from '../Templates/Pagina';

export default function TelaInicial(props) 
{
    const [usuario, setUsuario] = useContext(ContextoUsuario);
    return (
        <Pagina/>
    );
}
