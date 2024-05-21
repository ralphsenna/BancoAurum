import { Button, Table } from 'react-bootstrap';
import Icone from '../Templates/Icones';

export default function TabelaAgenciaProduto(props) 
{
    return (
        <div>
            {/* Cria tabela com a lista de produtos da agência selecionada */}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Código da Agência</th>
                        <th>Cidade da Agência</th>
                        <th>Código do Produto</th>
                        <th>Tipo do Produto</th>
                        <th>Nome do Produto</th>
                        <th>Data da Adesão</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {props.listaProdutosAgencia!==undefined && props.listaProdutosAgencia.map((produtoAgencia) => {
                        return (
                            <tr key={produtoAgencia.produto.codigo}>
                                <td>{produtoAgencia.agencia.codigo}</td>
                                <td>{produtoAgencia.agencia.cidade}</td>
                                <td>{produtoAgencia.produto.codigo}</td>
                                <td>{produtoAgencia.produto.tipo}</td>
                                <td>{produtoAgencia.produto.nome}</td>
                                <td>{produtoAgencia.data_adesao.split('-').reverse().join('/')}</td>
                                <td>
                                    <Button title='Alterar' variant='primary' style={{marginRight:'5px'}} onClick={() => {props.alterarProdutoAgencia(produtoAgencia)}}>
                                        <Icone.Alterar/>
                                    </Button>
                                    <Button title='Excluir' variant='danger' onClick={() => {
                                        if (window.confirm('Deseja realmente excluir o produto ' + produtoAgencia.produto.nome + ' da agência ' + produtoAgencia.agencia.numero + ' da cidade de ' + produtoAgencia.agencia.cidade + '?'))
                                            props.excluirProdutoAgencia(produtoAgencia);
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