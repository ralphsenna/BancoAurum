import { Button, Table } from 'react-bootstrap';
import Icone from '../Templates/Icones';

export default function TabelaProduto(props) 
{
    // Agrupa os produtos por tipo
    const produtosPorTipo = props.listaProdutos?.reduce((grupos, produto) => {
        const grupo = grupos[produto.tipo] || [];
        grupo.push(produto);
        grupos[produto.tipo] = grupo;
        return grupos;
    }, {});

    return (
        <div>
            {/* Cria tabela com a lista de produtos com os botões para alterar e excluir um produto e 
                também separa os produtos em tabelas diferentes*/}
            {Object.entries(produtosPorTipo).map(([tipo, produtos]) => (
                <div key={tipo}>
                    <h2 style={{textAlign: 'center'}}>{tipo}</h2>
                    <Table striped bordered hover style={{marginBottom: '50px'}}>
                        <thead>
                            
                            <tr>
                                <th>Código</th>
                                <th>Nome</th>
                                <th>Limite</th>
                                <th>Valor</th>
                                <th>Juros (%)</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {produtos.map((produto) => {
                                return (
                                    <tr key={produto.codigo}>
                                        <td>{produto.codigo}</td>
                                        <td>{produto.nome}</td>
                                        <td>{produto.limite}</td>
                                        <td>{produto.valor}</td>
                                        <td>{produto.juros}</td>
                                        <td>
                                            <Button variant='primary' style={{marginRight:'5px'}} onClick={() => {props.alterarProduto(produto)}}>
                                                <Icone.Alterar/>
                                            </Button>
                                            <Button variant='danger' onClick={() => {
                                                if (window.confirm('Deseja realmente excluir o produto ' + produto.nome + '?'))
                                                    props.excluirProduto(produto)
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
            ))}
        </div>
    )
}