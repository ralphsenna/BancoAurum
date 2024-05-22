import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Pagina from '../Templates/Pagina';
import TabelaUsuarioProduto from '../Tabelas/TabelaUsuarioProduto';
import FormCadProdutoUsuario from '../Formularios/FormCadProdutoUsuario';
import Icone from '../Templates/Icones';

// URLs para acessar o Backend
const urlUsuario = 'http://localhost:4000/usuario';
const urlAgencia = 'http://localhost:4000/agencia';

export default function TelaCadastroUsuarioProduto(props) 
{
    // Constantes para definir e controlar o estado das variáveis utilizadas
    const termo = useParams();
    const [exibirTabela, setExibirTabela] = useState(true);
    const [atualizando, setAtualizando] = useState(false);
    const [listaProdutos, setListaProdutos] = useState([{
        codigo: 0,
        tipo: '',
        nome: 'Nenhum produto encontrado na agência!'
    }]);
    const [listaProdutosUsuario, setListaProdutosUsuario] = useState([]);
    const produtoUsuarioVazio = {
        usuario: {
            codigo: 0,
            tipo: '',
            nome: '',
            cpf: '',
            rg: '',
            genero: '',
            telefone: '',
            data_nascimento: '',
            cep: '',
            endereco: '',
            cidade: '',
            uf: '',
            email: '',
            senha: '',
            agencia: {},
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
        data_contratacao: '',
        saldo: 0,
        valor_final: 0
    };
    const [produtoUsuarioAtual, setProdutoUsuarioAtual] = useState(produtoUsuarioVazio);

    // Função para chamar a consulta de usuários no Backend
    async function consultarUsuario() 
    {
        await fetch(urlUsuario+'/usu_codigo:'+termo.codigo, {method: 'GET'})
        .then(resposta => resposta.json())
        .then(retorno => {
            if (retorno.status) 
            {
                const produtoUsuarioSelecionado = {...produtoUsuarioVazio, usuario: retorno.listaUsuarios[0]};
                setProdutoUsuarioAtual(produtoUsuarioSelecionado);
            }
            else 
                alert(retorno.mensagem);
        })
        .catch(erro => {
            alert('Erro: ' + erro.mensagem);
        });
    }

    // Função para chamar a consulta de produtos da agência do usuário no Backend
    async function consultarProduto()
    {
        await fetch(urlAgencia+'/'+termo.codigo, {method: 'GET'})
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

    // Função para chamar a consulta de produtos do usuário no Backend
    async function consultarProdutosUsuario()
    {
        await fetch(urlUsuario+'/'+termo.codigo, {method: 'GET'})
        .then(resposta => resposta.json())
        .then(retorno => {
            if (retorno.status)
                setListaProdutosUsuario(retorno.listaProdutos);
            else
                alert(retorno.mensagem);
        })
        .catch(erro => {
            alert('Erro: ' + erro.mensagem);
        });
    }
    // Função que movimenta a lista de produtos do usuário sempre que a variável exibirTabela for alterada
    useEffect(() => {
        if (exibirTabela)
        {
            consultarUsuario();
            consultarProduto();
            consultarProdutosUsuario();
        }
    }, [exibirTabela]);

    // Função para chamar a gravação de um produto em um usuário no Backend
    async function gravarProdutoUsuario(produtoUsuario) 
    {
        await fetch(urlUsuario+'/'+produtoUsuario.usuario.codigo, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(produtoUsuario)
        })
        .then(resposta => resposta.json())
        .then(retorno => {
            if (retorno.status)
            {
                alert(retorno.mensagem + ' Código do produto: ' + retorno.codigo_gerado);
                setExibirTabela(true);
                setProdutoUsuarioAtual(produtoUsuarioVazio);
            }
            else
                alert(retorno.mensagem);
        })
        .catch(erro => {
            alert('Erro: ' + erro.message);
        });
    }

    // Função para chamar a alteração de um produto em um usuário no Backend
    async function alterarProdutoUsuario(produtoUsuario) 
    {
        if (!atualizando)
        {
            setExibirTabela(false);
            setAtualizando(true);
            setProdutoUsuarioAtual(produtoUsuario);
        }
        else
        {
            await fetch(urlUsuario+'/'+termo.codigo, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(produtoUsuario)
            })
            .then(resposta => resposta.json())
            .then(retorno => {
                if (retorno.status)
                {
                    alert(retorno.mensagem);
                    setAtualizando(false);
                    setExibirTabela(true);
                    setProdutoUsuarioAtual(produtoUsuarioVazio);
                }
                else
                    alert(retorno.mensagem);
            })
            .catch(erro => {
                alert('Erro: ' + erro.message);
            });
        }
    }

    // Função para chamar a exclusão de um produto em um usuário no Backend
    async function excluirProdutoUsuario(produtoUsuario) 
    {
        await fetch(urlUsuario+'/'+termo.codigo, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                usuario_codigo: produtoUsuario.usuario.codigo,
                produto_codigo: produtoUsuario.produto.codigo
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
        consultarProdutosUsuario();
    }

    if (exibirTabela) 
    {
        return (
            <div>
                <Pagina>
                    <h1 style={{ marginTop: '10px' }}>Tela de Cadastro de Usuários</h1>
                    <br/>
                    <h2>Lista de Produtos do Usuário: {produtoUsuarioAtual.usuario.nome}</h2>
                    <Button style={{marginRight: '5px'}} className='mb-3' onClick={() => {
                            setExibirTabela(false);
                        }}>
                        Contratar Produto
                    </Button>
                    <Link to='/usuario'>
                        <Button className='mb-3' title='Voltar'>
                            <Icone.Voltar/>
                        </Button>
                    </Link>
                    <TabelaUsuarioProduto
                        setExibirTabela={setExibirTabela}
                        listaProdutosUsuario={listaProdutosUsuario}
                        alterarProdutoUsuario={alterarProdutoUsuario}
                        excluirProdutoUsuario={excluirProdutoUsuario}
                    />
                </Pagina>
            </div>
        );
    }
    else
    {
        return (
            <div>
                <Pagina>
                    <h1 style={{ marginTop: '10px' }}>Tela de Cadastro de Usuários</h1>
                    <br/>
                    <FormCadProdutoUsuario
                        exibirTabela={exibirTabela}
                        setExibirTabela={setExibirTabela}
                        listaProdutos={listaProdutos}
                        gravarProdutoUsuario={gravarProdutoUsuario}
                        alterarProdutoUsuario={alterarProdutoUsuario}
                        atualizando={atualizando}
                        setAtualizando={setAtualizando}
                        produtoUsuario={produtoUsuarioAtual}
                        setProdutoUsuarioAtual={setProdutoUsuarioAtual}
                        produtoUsuarioVazio={produtoUsuarioVazio}
                    />
                </Pagina>
            </div>
        );
    }
}
