import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Menu(props) 
{
    return (
        <Navbar expand='lg' className='bg-body-tertiary'>
            <Container>
                <Navbar.Brand><Link to='/'>Menu</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='me-auto'>
                        <NavDropdown title='Cadastros' id='basic-nav-dropdown'>
                            <NavDropdown.Item><Link to='/agencia'>Agências</Link></NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item><Link to='/cliente'>Clientes</Link></NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item><Link to='/produto'>Produtos</Link></NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}