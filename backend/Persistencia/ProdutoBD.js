import Produto from '../Modelo/Produto.js';
import conectar from './Conexao.js';

export default class ProdutoBD 
{
    // Cadastra Produto no banco de dados
    async cadastrar(produto) 
    {
        if (produto instanceof Produto) 
        {
            const sql = 'INSERT INTO Produto (nome) VALUE (?)';
            const parametros = [produto.nome];
            const conexao = await conectar();
            const retorno = await conexao.execute(sql, parametros);
            produto.cod_prod = retorno[0].insertId;
            global.poolConexoes.pool.releaseConnection(conexao);
        }
    }

    // Consulta Produto(s) com ou sem parametros no banco de dados
    async consultar(paramConsulta) 
    {
        let sql = '';
        let parametros = [];
        if (Object.keys(paramConsulta).length === 0) 
        {
            sql = 'SELECT * FROM Produto';
        }
        else 
        {
            const coluna = Object.keys(paramConsulta);
            sql = 'SELECT * FROM Produto WHERE '+ coluna +' = ?';
        }
        parametros = Object.values(paramConsulta);
        const conexao = await conectar();
        const [registros] = await conexao.execute(sql, parametros);
        const listaProdutos = [];
        for (const registro of registros) 
        {
            const produto = new Produto(registro.cod_prod, registro.nome);
            listaProdutos.push(produto);
        }
        global.poolConexoes.pool.releaseConnection(conexao);
        return listaProdutos;
    }

    // Altera Produto no banco de dados
    async alterar(produto) 
    {
        if (produto instanceof Produto) 
        {
            const sql = 'UPDATE Produto SET nome = ? WHERE cod_prod = ?';
            const parametros = [produto.nome, produto.cod_prod];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.pool.releaseConnection(conexao);
        }
    }

    // Exclui Produto no banco de dados
    async excluir(produto) 
    {
        if (produto instanceof Produto) 
        {
            const sql = 'DELETE FROM Produto WHERE cod_prod = ?';
            const parametros = [produto.cod_prod];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.pool.releaseConnection(conexao);
        }
    }
}
