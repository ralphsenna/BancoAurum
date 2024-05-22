import { Button, Table } from 'react-bootstrap';
import Icone from '../Templates/Icones';

export default function TabelaUsuarioProduto(props) 
{
    return (
        <div>
            {/* Cria tabela com a lista de produtos do usuário selecionado */}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Código do Usuário</th>
                        <th>Nome do Usuário</th>
                        <th>Código do Produto</th>
                        <th>Tipo do Produto</th>
                        <th>Nome do Produto</th>
                        <th>Limite de Crédito</th>
                        <th>Valor</th>
                        <th>Juros (%)</th>
                        <th>Data de Contratação</th>
                        <th>Saldo do Cartão</th>
                        <th>Valor Final</th>  
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {props.listaProdutosUsuario!==undefined && props.listaProdutosUsuario.map((produtoUsuario) => {
                        return (
                            <tr key={produtoUsuario.produto.codigo}>
                                <td>{produtoUsuario.usuario.codigo}</td>
                                <td>{produtoUsuario.usuario.nome}</td>
                                <td>{produtoUsuario.produto.codigo}</td>
                                <td>{produtoUsuario.produto.tipo}</td>
                                <td>{produtoUsuario.produto.nome}</td>
                                <td>{produtoUsuario.produto.tipo!=='Cartão de Crédito' ? '--' : produtoUsuario.produto.limite}</td>
                                <td>{produtoUsuario.produto.tipo==='Cartão de Crédito' ||
                                     produtoUsuario.produto.tipo==='Cartão de Débito' ? '--' : produtoUsuario.produto.valor}</td>
                                <td>{produtoUsuario.produto.tipo==='Cartão de Crédito' || 
                                     produtoUsuario.produto.tipo==='Cartão de Débito' || 
                                     produtoUsuario.produto.tipo==='Seguro' ? '--' : produtoUsuario.produto.juros}%</td>
                                <td>{produtoUsuario.data_contratacao.split('-').reverse().join('/')}</td>
                                <td>{produtoUsuario.produto.tipo!=='Cartão de Crédito' ? '--' : produtoUsuario.saldo}</td>
                                <td>{produtoUsuario.produto.tipo==='Cartão de Crédito' ||
                                     produtoUsuario.produto.tipo==='Cartão de Débito' ? '--' : produtoUsuario.valor_final}</td>
                                <td>
                                    <Button title='Alterar' variant='primary' style={{marginRight:'5px'}} onClick={() => {props.alterarProdutoUsuario(produtoUsuario)}}>
                                        <Icone.Alterar/>
                                    </Button>
                                    <Button title='Excluir' variant='danger' onClick={() => {
                                        if (window.confirm('Deseja realmente excluir o produto ' + produtoUsuario.produto.nome + ' do usuário ' + produtoUsuario.usuario.nome + '?'))
                                            props.excluirProdutoUsuario(produtoUsuario);
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