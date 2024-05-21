import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Pagina from '../Templates/Pagina';
import TabelaAgenciaProduto from '../Tabelas/TabelaAgenciaProduto';
import FormCadProdutoAgencia from '../Formularios/FormCadProdutoAgencia';
import Icone from '../Templates/Icones';

// URLs para acessar o Backend
const urlAgencia = 'http://localhost:4000/agencia';
const urlProduto = 'http://localhost:4000/produto';

export default function TelaCadastroAgenciaproduto(props)
{
    // Constantes para definir e controlar o estado das váriaveis utilizadas
    const termo = useParams();
    const [exibirTabela, setExibirTabela] = useState(true);
    const [atualizando, setAtualizando] = useState(false);
    const [listaProdutos, setListaProdutos] = useState([{
        codigo: 0,
        tipo: '',
        nome: 'Nenhum produto encontrado!'
    }]);
    const [listaProdutosAgencia, setListaProdutosAgencia] = useState([]);
    const produtoAgenciaVazio = {
        agencia: {
            codigo: 0,
            numero: 0,
            telefone: '',
            email: '',
            cep: '',
            endereco: '',
            cidade: '',
            uf: '',
            produtos: {}
        },
        produto: {
            codigo: 0,
            tipo: '',
            nome: '',
            limite: 0,
            valor: 0,
            juros: 0
        },
        data_adesao: ''
    };
    const [produtoAgenciaAtual, setProdutoAgenciaAtual] = useState(produtoAgenciaVazio);

    // Função para chamar a consulta de agências no Backend
    async function consultarAgencia()
    {
        await fetch(urlAgencia+'/ag_codigo:'+termo.codigo, {method: 'GET'})
        .then(resposta => resposta.json())
        .then(retorno => {
            if (retorno.status)
            {   
                const produtoAgenciaSelecionado = {...produtoAgenciaVazio, agencia: retorno.listaAgencias[0]};
                setProdutoAgenciaAtual(produtoAgenciaSelecionado);
            }
            else
                alert(retorno.mensagem);
        })
        .catch(erro => {
            alert('Erro: ' + erro.mensagem);
        });
    }

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

    // Função para chamar a consulta dos produtos de uma agência no Backend
    async function consultarProdutosAgencia()
    {
        await fetch(urlAgencia+'/'+termo.codigo, {method: 'GET'})
        .then(resposta => resposta.json())
        .then(retorno => {
            if (retorno.status)
                setListaProdutosAgencia(retorno.listaProdutos);
            else
                alert(retorno.mensagem);
        })
        .catch(erro => {
            alert('Erro: ' + erro.message);
        });
    }
    // Função que movimenta a lista de produtos da agência sempre que a variável exibirTabela for alterada
    useEffect(() => {
        if (exibirTabela)
        {
            consultarAgencia();
            consultarProduto();
            consultarProdutosAgencia();
        }
    }, [exibirTabela]);
    
    // Função para chamar a gravação de um produto em uma agência no Backend
    async function gravarProdutoAgencia(produtoAgencia)
    {
        await fetch(urlAgencia+'/'+produtoAgencia.agencia.codigo, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(produtoAgencia)
        })
        .then(resposta => resposta.json())
        .then(retorno => {
            if (retorno.status)
            {
                alert(retorno.mensagem + ' Código do produto: ' + retorno.codigo_gerado);
                setExibirTabela(true);
                setProdutoAgenciaAtual(produtoAgenciaVazio);
            }
            else
                alert(retorno.mensagem);
        })
        .catch(erro => {
            alert('Erro: ' + erro.message);
        });
    }

    // Função para chamar a alteração de um produto em uma agência no Backend
    async function alterarProdutoAgencia(produtoAgencia)
    {
        if (!atualizando)
        {
            setExibirTabela(false);
            setAtualizando(true);
            setProdutoAgenciaAtual(produtoAgencia);
        }
        else
        {
            await fetch(urlAgencia+'/'+termo.codigo, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(produtoAgencia)
            })
            .then(resposta => resposta.json())
            .then(retorno => {
                if (retorno.status)
                {
                    alert(retorno.mensagem);
                    setAtualizando(false);
                    setExibirTabela(true);
                    setProdutoAgenciaAtual(produtoAgenciaVazio);
                }
                else
                    alert(retorno.mensagem);
            })
            .catch(erro => {
                alert('Erro: ' + erro.message);
            });
        }
    }

    // Função para chamar a exclusão de um produto em uma agência no Backend
    async function excluirProdutoAgencia(produtoAgencia)
    {
        await fetch(urlAgencia+'/'+termo.codigo, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                agencia_codigo: produtoAgencia.agencia.codigo,
                produto_codigo: produtoAgencia.produto.codigo
            })
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
        consultarProdutosAgencia();
    }

    if (exibirTabela)
        return (
            <div>
                <Pagina>
                    <h1 style={{ marginTop: '10px' }}>Tela de Cadastro de Agências</h1>
                    <br/>
                    <h2>Lista de Produtos da Agência {produtoAgenciaAtual.agencia.codigo}</h2>
                    <Button style={{marginRight: '5px'}} className='mb-3' onClick={() => {
                            setExibirTabela(false);
                        }}>
                        Aderir Produto
                    </Button>
                    <Link to='/agencia'>
                        <Button className='mb-3' title='Voltar'>
                            <Icone.Voltar/>
                        </Button>
                    </Link>
                    <TabelaAgenciaProduto
                        setExibirTabela={setExibirTabela}
                        listaProdutosAgencia={listaProdutosAgencia}
                        alterarProdutoAgencia={alterarProdutoAgencia}
                        excluirProdutoAgencia={excluirProdutoAgencia}
                    />
                </Pagina>
            </div>
        );
    else
    {
        return (
            <div>
                <Pagina>
                    <h1 style={{ marginTop: '10px' }}>Tela de Cadastro de Agências</h1>
                    <br/>
                    <FormCadProdutoAgencia
                        exibirTabela={exibirTabela}
                        setExibirTabela={setExibirTabela}
                        listaProdutos={listaProdutos}
                        gravarProdutoAgencia={gravarProdutoAgencia}
                        alterarProdutoAgencia={alterarProdutoAgencia}
                        atualizando={atualizando}
                        setAtualizando={setAtualizando}
                        produtoAgencia={produtoAgenciaAtual}
                        setProdutoAgenciaAtual={setProdutoAgenciaAtual}
                        produtoAgenciaVazio={produtoAgenciaVazio}
                    />
                </Pagina>
            </div>
        );
    }
}
