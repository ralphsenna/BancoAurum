import { Button, Table } from 'react-bootstrap';
import { useState } from 'react';
import Icone from '../Templates/Icones';

export default function TabelaUsuario(props) 
{
    // Inicializa o estado de mostrar a senha
    const [mostrarSenha, setMostrarSenha] = useState(false);

    // Altere o estado quando o botão for clicado
    const mudarMostrarSenha = (codigo) => {
        setMostrarSenha({...mostrarSenha, [codigo]: !mostrarSenha[codigo]});
    }

    return (
        <div>
            {/* Cria tabela com a lista de usuários com os botões para alterar e excluir um usuário */}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Tipo</th>
                        <th>Nome</th>
                        <th>CPF</th>
                        <th>RG</th>
                        <th>Gênero</th>
                        <th>Telefone</th>
                        <th>Data de Nascimento</th>
                        <th>CEP</th>
                        <th>Endereço</th>
                        <th>Cidade</th>
                        <th>UF</th>
                        <th>E-mail</th>
                        <th>Senha</th>
                        <th>N° da Agência</th>
                        <th>Cidade da Agência</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {props.listaUsuarios?.map((usuario) => {
                        return (
                            <tr key={usuario.codigo}>
                                <td>{usuario.codigo}</td>
                                <td>{usuario.tipo}</td>
                                <td>{usuario.nome}</td>
                                <td>{usuario.cpf}</td>
                                <td>{usuario.rg}</td>
                                <td>{usuario.genero}</td>
                                <td>{usuario.telefone}</td>
                                <td>{usuario.data_nascimento.split('-').reverse().join('/')}</td>
                                <td>{usuario.cep}</td>
                                <td>{usuario.endereco}</td>
                                <td>{usuario.cidade}</td>
                                <td>{usuario.uf}</td>
                                <td>{usuario.email}</td>
                                <td>
                                    {mostrarSenha[usuario.codigo] ? usuario.senha : '••••••••'}
                                    <Button variant='secondary' onClick={() => mudarMostrarSenha(usuario.codigo)}>
                                        {mostrarSenha[usuario.codigo] ? 
                                            <Icone.SenhaOculta/>
                                            : 
                                            <Icone.SenhaVisivel/>
                                        }
                                    </Button>
                                </td>
                                <td>{usuario.agencia.numero}</td>
                                <td>{usuario.agencia.cidade}</td>
                                <td>
                                    <Button title='Alterar' variant='primary' style={{marginRight:'5px'}} onClick={() => {props.alterarUsuario(usuario)}}>
                                        <Icone.Alterar/>
                                    </Button>
                                    <Button title='Excluir' variant='danger' onClick={() => {
                                        if (window.confirm('Deseja realmente excluir o usuário ' + usuario.nome + '?'))
                                            props.excluirUsuario(usuario)
                                    }}>
                                        <Icone.Excluir/>
                                    </Button>
                                </td>	
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>
    )
}