import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Pagina from '../Templates/Pagina';
import TabelaProduto from '../Tabelas/TabelaProduto';
import FormCadProduto from '../Formularios/FormCadProduto';

// URL para acessar o Backend de Produto
const urlProduto = 'http://localhost:4000/produto';

export default function TelaCadastrarProduto(props) 
{
    // Constantes para definir e controlar o estado das váriaveis utilizadas
    const [exibirTabela, setExibirTabela] = useState(true);
    const [listaProdutos, setListaProdutos] = useState([]);
    const [atualizando, setAtualizando] = useState(false);
    const produtoVazio = {
        cod_prod: 0,
        descricao: ''
    };
    const [produtoAtual, setProdutoAtual] = useState(produtoVazio);

    // Função para chamar a consulta de produtos no Backend
    async function consultarProduto()
    {
        await fetch(urlProduto, {method: 'GET'})
        .then(resposta => resposta.json())
        .then(retorno => {
            if (retorno.status)
                setListaProdutos(retorno.listaProdutos);
            else
                alert(retorno.mensagem);
        })
        .catch(erro => {
            alert('Erro: ' + erro.mensagem);
        });
    }
    // Função que movimenta a lista de produtos sempre que a variável exibirTabela for alterada
    useEffect(() => {
        if (exibirTabela)
            consultarProduto();
    }, [exibirTabela]);

    // Função para chamar a gravação de um produto no Backend
    async function gravarProduto(produto)
    {
        await fetch(urlProduto, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(produto)
        })
        .then(resposta => resposta.json())
        .then(retorno => {
            if (retorno.status)
                alert(retorno.mensagem + ' Código do produto: ' + retorno.codigoGerado);    
            else
                alert(retorno.mensagem);
        })
        .catch(erro => {
            alert('Erro: ' + erro.message);
        });
        setExibirTabela(true);
        setProdutoAtual(produtoVazio);
    }

    // Função para chamar a alteração de um produto no Backend
    async function alterarProduto(produto)
    {
        if (!atualizando)
        {
            setExibirTabela(false);
            setAtualizando(true);
            setProdutoAtual(produto);
        }
        else
        {
            await fetch(urlProduto, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(produto)
            })
            .then(resposta => resposta.json())
            .then(retorno => {
                if (retorno.status)
                    alert(retorno.mensagem);
                else
                    alert(retorno.mensagem);
            })
            .catch(erro => {
                alert('Erro: ' + erro.message);
            });
            setAtualizando(false);
            setExibirTabela(true);
            setProdutoAtual(produtoVazio);
        }
    }

    // Função para chamar a exclusão de um produto no Backend
    async function excluirProduto(produto)
    {
        await fetch(urlProduto, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({cod_prod: produto.cod_prod})
        })
        .then(resposta => resposta.json())
        .then(retorno => {
            if (retorno.status)
                alert(retorno.mensagem);
            else
                alert(retorno.mensagem);
        })
        .catch(erro => {
            alert('Erro: ' + erro.message);
        });
        consultarProduto();
    }

    // Se a variável exibirTabela for verdadeira, exibe a tabela de produtos
    if (exibirTabela)
    {
        return (
            <div>
                <Pagina>
                    <h2 style={{ marginTop: '10px' }}>Tela de Cadastro de Produtos</h2>
                    <br/>
                    <h2>Lista de Produtos</h2>
                    <Button className='mb-3' onClick={() => {
                            setExibirTabela(false);
                        }}>
                        Cadastrar Produto
                    </Button>
                    <TabelaProduto
                        setExibirTabela={setExibirTabela}
                        listaProdutos={listaProdutos}
                        alterarProduto={alterarProduto}
                        excluirProduto={excluirProduto}
                    />
                </Pagina>
            </div>
        )
    }
    // Se a variável exibirTabela for falsa, exibe o formulário de cadastro de produtos
    else
    {
        return (
            <div>
                <Pagina>
                    <h1>Tela de Cadastro de Produtos</h1>
                    <br/>
                    <h2>Formulário de cadastro de Produtos</h2>
                    <FormCadProduto
                        exibirTabela={exibirTabela}
                        setExibirTabela={setExibirTabela}
                        gravarProduto={gravarProduto}
                        alterarProduto={alterarProduto}
                        atualizando={atualizando}
                        setAtualizando={setAtualizando}
                        produto={produtoAtual}
                        setProdutoAtual={setProdutoAtual}
                        produtoVazio={produtoVazio}
                    />
                </Pagina>
            </div>
        )
    }
}
