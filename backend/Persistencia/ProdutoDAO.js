import Produto from '../Modelo/Produto.js';
import conectar from './Conexao.js';

export default class ProdutoDAO 
{
    // Cadastra Produto no banco de dados
    async cadastrar(produto) 
    {
        if (produto instanceof Produto) 
        {
            const conexao = await conectar();   
            await conexao.beginTransaction();
            try
            {
                const sql = 'INSERT INTO Produto (descricao) VALUE (?)';
                const parametros = [produto.descricao];
                const retorno = await conexao.execute(sql, parametros);
                produto.cod_prod = retorno[0].insertId;
                await conexao.commit();
            }
            catch(erro)
            {
                await conexao.rollback();
                throw erro;
            }
            finally
            {
                conexao.release();
            }
        }
    }

    // Consulta Produto(s) com ou sem parametros no banco de dados
    async consultar(paramConsulta) 
    {
        let sql = '';
        let parametros = [];
        if (Object.keys(paramConsulta).length===0) 
            sql = 'SELECT * FROM Produto';
        else 
        {
            const coluna = Object.keys(paramConsulta);
            sql = 'SELECT * FROM Produto WHERE ' + coluna + ' = ?';
        }
        parametros = Object.values(paramConsulta);
        const conexao = await conectar();
        const [registros] = await conexao.execute(sql, parametros);
        const listaProdutos = [];
        for (const registro of registros) 
        {
            const produto = new Produto(registro.cod_prod, registro.descricao);
            listaProdutos.push(produto);
        }
        conexao.release();
        return listaProdutos;
    }

    // Altera Produto no banco de dados
    async alterar(produto) 
    {
        if (produto instanceof Produto) 
        {
            const conexao = await conectar();   
            await conexao.beginTransaction();
            try
            {
                const sql = 'UPDATE Produto SET descricao = ? WHERE cod_prod = ?';
                const parametros = [produto.descricao, produto.cod_prod];
                await conexao.execute(sql, parametros);
                await conexao.commit();
            }
            catch(erro)
            {
                await conexao.rollback();
                throw erro;
            }
            finally
            {
                conexao.release();
            }
        }
    }

    // Exclui Produto no banco de dados
    async excluir(produto) 
    {
        if (produto instanceof Produto) 
        {
            const conexao = await conectar();
            await conexao.beginTransaction();
            try
            {
                const sql = 'DELETE FROM Produto WHERE cod_prod = ?';
                const parametros = [produto.cod_prod];
                await conexao.execute(sql, parametros);
                await conexao.commit();
            }
            catch(erro)
            {
                await conexao.rollback();
                throw erro;
            }
            finally
            {
                conexao.release();
            }
        }
    }
}
