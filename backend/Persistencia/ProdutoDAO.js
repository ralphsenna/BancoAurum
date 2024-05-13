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
                const sql = `INSERT INTO Produto (pro_tipo, pro_nome, pro_limite, pro_valor, pro_juros) 
                             VALUES (?, ?, ?, ?, ?)`;
                const parametros = [produto.tipo, produto.nome, produto.limite, produto.valor, produto.juros];
                const retorno = await conexao.execute(sql, parametros);
                produto.codigo = retorno[0].insertId;
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
    async consultar(termo) 
    {
        let sql = '';
        let parametros = [];
        if (Object.keys(termo).length===0) 
            sql = 'SELECT * FROM Produto';
        else 
        {
            const coluna = Object.keys(termo);
            sql = 'SELECT * FROM Produto WHERE ' + coluna + ' = ?';
        }
        parametros = Object.values(termo);
        const conexao = await conectar();
        const [registros] = await conexao.execute(sql, parametros);
        const listaProdutos = [];
        for (const registro of registros) 
        {
            const produto = new Produto(registro.pro_codigo, registro.pro_tipo, registro.pro_nome,
                                        registro.pro_limite, registro.pro_valor, registro.pro_juros);
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
                const sql = 'UPDATE Produto SET pro_nome = ?, pro_limite = ?, pro_valor = ?, pro_juros = ? WHERE pro_codigo = ?';
                const parametros = [produto.nome, produto.limite, produto.valor, produto.juros, produto.codigo];
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
                const sql = 'DELETE FROM Produto WHERE pro_codigo = ?';
                const parametros = [produto.codigo];
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
