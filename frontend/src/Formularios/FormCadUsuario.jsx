import { Button, Col, Form, Row } from 'react-bootstrap';
import { useState } from 'react';

export default function FormCadUsuario(props) 
{
    // Define o estado do formulário e do usuário
    const [validado, setValidado] = useState(true);
    const [usuario, setUsuario] = useState(props.usuario);

    // Função para manipular qualquer mudança de valores nos campos do formulário
    function manipularMudanca(evento) 
    {
        const componente = evento.currentTarget;
        /* if (componente.name==='tipo')
            setUsuario({...usuario, tipo: {"key": componente.value}}); */
        if (componente.name==='agencia')
            setUsuario({...usuario, agencia: {"cod_ag": componente.value}});
        else
            setUsuario({ ...usuario, [componente.name]: componente.value });
    }

    // Função para enviar os dados do formulário para gravação/alteração caso estejam válidos
    function manipularSubmissao(evento) 
    {
        evento.preventDefault();
        evento.stopPropagation();
        const form = evento.currentTarget;
        if (!form.checkValidity()) 
            setValidado(false);
        else
        {
            setValidado(true);
            if (!props.atualizando)
                props.gravarUsuario(usuario);
            else
                props.alterarUsuario(usuario);
        }
    }
    
    // Retorna o formulário de cadastro de usuário e seus atributos para ser preenchido
    return (
        <Form noValidate validated={!validado} onSubmit={manipularSubmissao}>
            <Row className='mb-3'>
                {/* Código do Usuário */}
                <Form.Group as={Col} md='1'>
                    <Form.Label>Código</Form.Label>
                    <Form.Control
                        disabled
                        type='number'
                        placeholder='0'
                        value={usuario.cod_usu}
                        id='cod_usu'
                        name='cod_usu'
                        onChange={manipularMudanca}
                    />
                </Form.Group>
            </Row>
            <Row className='mb-3'>
                {/* Nome do Usuário */}
                <Form.Group as={Col} md='5'>
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Nome Completo'
                        value={usuario.nome}
                        id='nome'
                        name='nome'
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe o nome!</Form.Control.Feedback>
                </Form.Group>
                {/* Data de Nascimento do Usuário */}
                <Form.Group as={Col} md='2'>
                    <Form.Label>Data de Nascimento</Form.Label>
                    <Form.Control 
                        required 
                        type='date' 
                        placeholder='Data de Nascimento' 
                        value={usuario.dataNasc}
                        id='dataNasc'
                        name='dataNasc'
                        onChange={manipularMudanca}
                        max={new Date(Date.now()).toISOString().split("T")[0]}
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe a data de nascimento!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className='mb-3'>
                {/* CPF e RG do Usuário */}
                <Form.Group as={Col} md='3'>
                    <Form.Label>CPF</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='CPF'
                        value={usuario.cpf}
                        id='cpf'
                        name='cpf'
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe o CPF!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md='3'>
                    <Form.Label>RG</Form.Label>
                    <Form.Control 
                        required 
                        type='text' 
                        placeholder='RG' 
                        value={usuario.rg}
                        id='rg'
                        name='rg'
                        onChange={manipularMudanca}/>
                    <Form.Control.Feedback type='invalid'>Por favor, informe o RG!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className='mb-3'>
                {/* Endereço do Usuário */}
                <Form.Group as={Col} md='4'>
                    <Form.Label>Endereço</Form.Label>
                    <Form.Control 
                        required 
                        type='text' 
                        placeholder='Endereço' 
                        value={usuario.endereco}
                        id='endereco'
                        name='endereco'
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe o endereço!</Form.Control.Feedback>
                </Form.Group>
                {/* Cidade e UF do Usuário */}
                <Form.Group as={Col} md='3'>
                    <Form.Label>Cidade</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Cidade'
                        value={usuario.cidade}
                        id='cidade'
                        name='cidade'
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe a cidade!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md='1'>
                    <Form.Label>UF</Form.Label>
                    <Form.Control 
                        required 
                        type='text' 
                        placeholder='UF' 
                        value={usuario.uf}
                        id='uf'
                        name='uf'
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe o estado!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className='mb-3'>
                {/* Telefone do Usuário */}
                <Form.Group as={Col} md='2'>
                    <Form.Label>Telefone</Form.Label>
                    <Form.Control 
                        required 
                        type='text' 
                        placeholder='Telefone' 
                        value={usuario.telefone}
                        id='telefone'
                        name='telefone'
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe o telefone!</Form.Control.Feedback>
                </Form.Group>
                {/* Tipo do Usuário */}
                <Form.Group as={Col} md='3'>
                    <Form.Label>Tipo</Form.Label>
                    <Form.Select 
                        required
                        value={usuario.tipo}
                        id='tipo'
                        name='tipo'
                        onChange={manipularMudanca}
                    >
                        <option key={0} value={''}>Selecione o tipo</option>
                        <option key={1} value={'Cliente'}>Cliente</option>
                        <option key={2} value={'Gerente'}>Gerente</option>
                    </Form.Select>
                    <Form.Control.Feedback type='invalid'>Por favor, informe o tipo!</Form.Control.Feedback>
                </Form.Group>
                {/* Agência do Usuário */}
                <Form.Group as={Col} md='3'>
                    <Form.Label>Agência</Form.Label>
                    <Form.Select 
                        required
                        value={usuario.agencia.cod_ag}
                        id='agencia' 
                        name='agencia'
                        onChange={manipularMudanca}
                    >
                        {
                            props.listaAgencias[0].cod_ag!=='' ?
                            (
                                <><option key={0} value={''}>Selecione uma agência</option>
                                {
                                    props.listaAgencias.map((agencia) => {
                                        return (
                                            <option key={agencia.cod_ag} value={agencia.cod_ag}>{agencia.cod_ag}: {agencia.cidade}</option>
                                        );
                                    }) 
                                }</>
                            ): <option key={0} value={''}>{props.listaAgencias[0].endereco}</option>
                        }
                    </Form.Select>
                    <Form.Control.Feedback type='invalid'>Por favor, informe a agência!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className='mb-3'>
                {/* E-mail e Senha do Usuário */}
                <Form.Group as={Col} md='4'>
                    <Form.Label>E-mail</Form.Label>
                    <Form.Control 
                        required 
                        type='text' 
                        placeholder='E-mail' 
                        value={usuario.email}
                        id='email'
                        name='email'
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe o e-mail!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md='3'>
                    <Form.Label>Senha</Form.Label>
                    <Form.Control 
                        required 
                        type='password' 
                        placeholder='Senha' 
                        value={usuario.senha}
                        id='senha'
                        name='senha'
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe a senha!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            {/* Botões para Gravar/Alterar e Voltar para a lista de usuários */}
            <Button style={{marginRight:'5px'}} type='submit'>
                {props.atualizando ? 'Atualizar' : 'Gravar'}
            </Button>
            <Button onClick={() => {
                if (props.atualizando)
                    props.setAtualizando(false);
                props.setExibirTabela(true);
                props.setUsuarioAtual(props.usuarioVazio);
            }}>Voltar</Button>
        </Form>
    )
}