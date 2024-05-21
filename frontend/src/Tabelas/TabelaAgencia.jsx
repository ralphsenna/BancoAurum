import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Icone from '../Templates/Icones';

export default function TabelaAgencia(props) 
{
    return (
        <div>
            {/* Cria tabela com a lista de agências com os botões para alterar e excluir uma agência */}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Número</th>
                        <th>Telefone</th>
                        <th>E-mail</th>
                        <th>CEP</th>
                        <th>Endereço</th>
                        <th>Cidade</th>
                        <th>UF</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {props.listaAgencias?.map((agencia) => {
                        return (
                            <tr key={agencia.codigo}>
                                <td>{agencia.codigo}</td>
                                <td>{agencia.numero}</td>
                                <td>{agencia.telefone}</td>
                                <td>{agencia.email}</td>
                                <td>{agencia.cep}</td>
                                <td>{agencia.endereco}</td>
                                <td>{agencia.cidade}</td>
                                <td>{agencia.uf}</td>
                                <td>
                                    <Link to={{ pathname: `/agencia/${agencia.codigo}`, state: {agencia} }}>
                                        <Button title='Listar Produtos' variant='info' style={{marginRight:'5px'}}>
                                            <Icone.Produtos/>
                                        </Button>
                                    </Link>
                                    <Button title='Alterar' variant='primary' style={{marginRight:'5px'}} onClick={() => {props.alterarAgencia(agencia)}}>
                                        <Icone.Alterar/>
                                    </Button>
                                    <Button title='Excluir' variant='danger' onClick={() => {
                                        if (window.confirm('Deseja realmente excluir a agência que se encontra no endereço ' + agencia.endereco + '?'))
                                            props.excluirAgencia(agencia)
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