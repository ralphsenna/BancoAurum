import Agencia from '../Modelo/Agencia.js';
import Produto from '../Modelo/Produto.js';
import AgenciaProduto from '../Modelo/AgenciaProduto.js';
import conectar from './Conexao.js';

export default class AgenciaDAO 
{
    // Cadastra Agencia no banco de dados
    async cadastrar(agencia) 
    {
        if (agencia instanceof Agencia) 
        {
            const conexao = await conectar();   
            await conexao.beginTransaction();
            try
            {
                const sql = `INSERT INTO Agencia (ag_numero, ag_telefone, ag_email, ag_cep, ag_endereco, ag_cidade, ag_uf) 
                             VALUES (?, ?, ?, ?, ?, ?, ?)`;
                const parametros = [agencia.numero, agencia.telefone, agencia.email, agencia.cep, agencia.endereco, agencia.cidade, agencia.uf];
                const retorno = await conexao.execute(sql, parametros);
                agencia.codigo = retorno[0].insertId;
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

    // Cadastra Produto na Agencia no banco de dados
    async cadastrarProduto(agenciaProduto) 
    {
        if (agenciaProduto instanceof AgenciaProduto) 
        {
            const conexao = await conectar();   
            await conexao.beginTransaction();
            try
            {
                const sql = `INSERT INTO Agencia_Produto (ag_codigo, pro_codigo, ap_data_adesao) 
                             VALUES (?, ?, ?)`;
                const parametros = [agenciaProduto.agencia.codigo, agenciaProduto.produto.codigo, agenciaProduto.data_adesao];
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

    // Consulta Agencia(s) com ou sem parametros no banco de dados
    async consultar(termo) 
    {
        let sql = '';
        let parametros = [];
        const listaAgencias = [];
        const listaProdutos = [];
        if (!isNaN(parseInt(termo)))
        {
            parametros = [termo];
            sql = `SELECT * FROM Agencia_Produto as ap
                   INNER JOIN Agencia as a ON a.ag_codigo = ap.ag_codigo
                   INNER JOIN Produto as p ON p.pro_codigo = ap.pro_codigo
                   WHERE ap.ag_codigo = ?`;
        }
        else if (Object.keys(termo).length>0) 
        {
            const coluna = termo.split(':')[0];
            parametros = [termo.split(':')[1]];
            sql = 'SELECT * FROM Agencia WHERE ' + coluna + ' = ?';
        }
        else
        {
            sql = 'SELECT * FROM Agencia';
        }
        const conexao = await conectar();
        const [registros] = await conexao.execute(sql, parametros);
        if (!isNaN(parseInt(termo)) && registros.length>0)
        {
            const agencia = new Agencia(registros[0].ag_codigo, registros[0].ag_numero, registros[0].ag_telefone, registros[0].ag_email, 
                                        registros[0].ag_cep, registros[0].ag_endereco, registros[0].ag_cidade, registros[0].ag_uf);
            for (const registro of registros) 
            {
                const produto = new Produto(registro.pro_codigo, registro.pro_tipo, registro.pro_nome, registro.pro_limite, registro.pro_valor, registro.pro_juros);
                registro.ap_data_adesao = registro.ap_data_adesao.toISOString().split('T')[0];
                const produtoAgencia = new AgenciaProduto(agencia, produto, registro.ap_data_adesao);
                listaProdutos.push(produtoAgencia);
            }
        }
        else
        {
            for (const registro of registros) 
            {
                const agencia = new Agencia(registro.ag_codigo, registro.ag_numero, registro.ag_telefone, registro.ag_email, 
                                            registro.ag_cep, registro.ag_endereco, registro.ag_cidade, registro.ag_uf);
                listaAgencias.push(agencia);
            }
        }
        conexao.release();
        if (!isNaN(parseInt(termo)))
            return listaProdutos;
        else
            return listaAgencias;
    }

    // Altera Agencia no banco de dados
    async alterar(agencia) 
    {
        if (agencia instanceof Agencia) 
        {
            const conexao = await conectar();   
            await conexao.beginTransaction();
            try
            {
                const sql = 'UPDATE Agencia SET ag_numero = ?, ag_telefone = ?, ag_email = ?, ag_cep = ?, ag_endereco = ?, ag_cidade = ?, ag_uf = ? WHERE ag_codigo = ?';
                const parametros = [agencia.numero, agencia.telefone, agencia.email, agencia.cep, agencia.endereco, agencia.cidade, agencia.uf, agencia.codigo];
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

    // Altera Produto da Agencia no banco de dados
    async alterarProduto(agenciaProduto) 
    {
        if (agenciaProduto instanceof AgenciaProduto) 
        {
            const conexao = await conectar();   
            await conexao.beginTransaction();
            try
            {
                const sql = 'UPDATE Agencia_Produto SET ap_data_adesao = ? WHERE ag_codigo = ? AND pro_codigo = ?';
                const parametros = [agenciaProduto.data_adesao, agenciaProduto.agencia.codigo, agenciaProduto.produto.codigo];
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

    // Exclui Agencia no banco de dados
    async excluir(agencia) 
    {
        if (agencia instanceof Agencia) 
        {
            const conexao = await conectar();
            await conexao.beginTransaction();
            try
            {
                const sql = 'DELETE FROM Agencia WHERE ag_codigo = ?';
                const parametros = [agencia.codigo];
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

    // Exclui Produto da Agencia no banco de dados
    async excluirProduto(agenciaProduto) 
    {
        if (agenciaProduto instanceof AgenciaProduto)
        {
            const conexao = await conectar();
            await conexao.beginTransaction();
            try
            {
                const sql = 'DELETE FROM Agencia_Produto WHERE ag_codigo = ? AND pro_codigo = ?';
                const parametros = [agenciaProduto.agencia.codigo, agenciaProduto.produto.codigo];
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
