import { Container, Form, Button } from "react-bootstrap";
import { useContext, useState } from "react";
import { ContextoUsuario } from "../Templates/Contexto";

export default function TelaLogin() 
{
    const [usuario, setUsuario] = useContext(ContextoUsuario);
    const [nomeUsuario, setNomeUsuario] = useState("");
    const [senha, setSenha] = useState("");

    // Função para realizar o login
    function realizarLogin()
    {
        if (nomeUsuario==='adminaurum' && senha==='adminaurum')
        {
            setUsuario({
                nome: nomeUsuario,
                senha: senha,
                logado: true
            });
        }
    }
    
    return (
        <Container className="d-flex align-items-center justify-content-center w-50">
            <Form className="mt-5">
                {/* Formulário de usuário */}
                <Form.Group className="mb-3">
                    <Form.Label>Usuário</Form.Label>
                    <Form.Control 
                        type="username"  
                        id="usuario" 
                        name="usuario"
                        value={nomeUsuario}
                        onChange={(e) => setNomeUsuario(e.target.value)}/>
                </Form.Group>

                {/* Formulário de senha */}
                <Form.Group className="mb-3">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control 
                        type="password" 
                        id="senha" 
                        name="senha"  
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />
                </Form.Group>
                
                {/* Botão de entrar */}
                <Button variant="primary" type="button" onClick={realizarLogin}>
                    Entrar
                </Button>
            </Form>
        </Container>
    );

}