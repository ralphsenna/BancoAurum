import { Button, Col, Form, Row } from 'react-bootstrap';
import { useState } from 'react';

export default function FormCadUsuario(props) 
{
    // Define o estado do formulário e do usuário
    const [validado, setValidado] = useState(true);
    //const [validaSenha, setValidaSenha] = useState(true);
    const [usuario, setUsuario] = useState(props.usuario);
    const [senha_confirmada, setSenhaConfirmada] = useState('');

    // Função para manipular qualquer mudança de valores nos campos do formulário
    function manipularMudanca(evento) 
    {
        const componente = evento.currentTarget;
        if (componente.name==='agencia')
            setUsuario({...usuario, agencia: {"codigo": componente.value}});
        else if (componente.name==='senha_confirmada')
            setSenhaConfirmada(componente.value);
        else
            setUsuario({ ...usuario, [componente.name]: componente.value});
        /* if (componente.name==='senha_confirmada')
        {
            if (senha_confirmada===usuario.senha)
                setValidaSenha(true);
            else
                setValidaSenha(false);
        } */
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
                        value={usuario.codigo}
                        id='codigo'
                        name='codigo'
                        onChange={manipularMudanca}
                    />
                </Form.Group>
            </Row>
            <Row className='mb-3'>
                {/* Tipo do Usuário */}
                <Form.Group as={Col} md='2'>
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
                        <option key={2} value={'Funcionario'}>Funcionário</option>
                        <option key={3} value={'Gerente'}>Gerente</option>
                    </Form.Select>
                    <Form.Control.Feedback type='invalid'>Por favor, informe o tipo!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            {!props.atualizando && (
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
                        value={usuario.data_nascimento}
                        id='data_nascimento'
                        name='data_nascimento'
                        onChange={manipularMudanca}
                        max={new Date(Date.now()).toISOString().split("T")[0]}
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe a data de nascimento!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            )}
            {!props.atualizando && (
            <Row className='mb-3'>
                {/* Gênero do Usuário */}
                <Form.Group as={Col} md='2'>
                    <Form.Label>Gênero</Form.Label>
                    <Form.Select 
                        required
                        value={usuario.genero}
                        id='genero'
                        name='genero'
                        onChange={manipularMudanca}
                    >
                        <option key={0} value={''}>Selecione o gênero</option>
                        <option key={1} value={'Masculino'}>Masculino</option>
                        <option key={2} value={'Feminino'}>Feminino</option>
                    </Form.Select>
                    <Form.Control.Feedback type='invalid'>Por favor, informe o gênero!</Form.Control.Feedback>
                </Form.Group>
                {/* CPF do Usuário */}
                <Form.Group as={Col} md='2'>
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
                {/* RG do Usuário */}
                <Form.Group as={Col} md='2'>
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
            )}
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
                {/* Agência do Usuário */}
                <Form.Group as={Col} md='3'>
                    <Form.Label>Agência</Form.Label>
                    <Form.Select 
                        required
                        value={usuario.agencia.codigo}
                        id='agencia' 
                        name='agencia'
                        onChange={manipularMudanca}
                    >
                        {
                            props.listaAgencias[0].codigo!=='' ?
                            (
                                <><option key={0} value={''}>Selecione uma agência</option>
                                {
                                    props.listaAgencias.map((agencia) => {
                                        return (
                                            <option key={agencia.codigo} value={agencia.codigo}>({agencia.numero}) - {agencia.cidade}</option>
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
                {/* CEP do Usuário */}
                <Form.Group as={Col} md='1'>
                    <Form.Label>CEP</Form.Label>
                    <Form.Control 
                        required 
                        type='text' 
                        placeholder='CEP' 
                        value={usuario.cep}
                        id='cep'
                        name='cep'
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe o CEP!</Form.Control.Feedback>
                </Form.Group>
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
            </Row>
            <Row className='mb-3'>
                {/* Cidade do Usuário */}
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
                {/* UF do Usuário */}
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
                {/* E-mail do Usuário */}
                <Form.Group as={Col} md='4'>
                    <Form.Label>E-mail</Form.Label>
                    <Form.Control 
                        required 
                        type='email' 
                        placeholder='E-mail' 
                        value={usuario.email}
                        id='email'
                        name='email'
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe o e-mail!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className='mb-3'>
                {/* Senha do Usuário */}
                <Form.Group as={Col} md='2'>
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
                {/* Confirmação da Senha do Usuário */}
                <Form.Group as={Col} md='2'>
                    <Form.Label>Confirmar Senha</Form.Label>
                    <Form.Control 
                        required
                        placeholder='Confirmar Senha' 
                        type='password' 
                        value={senha_confirmada}
                        id='senha_confirmada'
                        name='senha_confirmada'
                        onChange={manipularMudanca}
                        //isInvalid={!validaSenha}
                    />
                    {   senha_confirmada==='' ? (
                        <Form.Control.Feedback type='invalid'>Por favor, informe novamente a senha!</Form.Control.Feedback>
                    ) : (
                        senha_confirmada!==usuario.senha &&
                        <Form.Control.Feedback type='invalid'>As senhas não conferem!</Form.Control.Feedback>
                    )}
                </Form.Group>
            </Row>
            {/* Botões para Gravar/Alterar e Voltar para a lista de usuários */}
            <Button style={{marginRight:'5px', marginBottom:'20px'}} type='submit'>
                {props.atualizando ? 'Atualizar' : 'Gravar'}
            </Button>
            <Button style={{marginBottom:'20px'}} onClick={() => {
                if (props.atualizando)
                    props.setAtualizando(false);
                props.setExibirTabela(true);
                props.setUsuarioAtual(props.usuarioVazio);
            }}>Voltar</Button>
        </Form>
    )
}