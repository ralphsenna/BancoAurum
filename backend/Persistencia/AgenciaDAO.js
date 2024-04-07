import Agencia from '../Modelo/Agencia.js';
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
                const sql = 'INSERT INTO Agencia (endereco, cidade, uf, telefone) VALUES(?,?,?,?)';
                const parametros = [agencia.endereco, agencia.cidade, agencia.uf, agencia.telefone];
                const retorno = await conexao.execute(sql, parametros);
                agencia.cod_ag = retorno[0].insertId;
                await conexao.commit();
            }
            catch (erro)
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
    async consultar(paramConsulta) 
    {
        let sql = '';
        let parametros = [];
        if (Object.keys(paramConsulta).length===0)
        {
            sql = 'SELECT * FROM Agencia';
        }
        else
        {
            sql = 'SELECT * FROM Agencia WHERE cidade like %?%';
        }
        parametros = [paramConsulta]
        const conexao = await conectar();
        const [registros] = await conexao.execute(sql, parametros);
        const listaAgencias = [];
        for (const registro of registros) 
        {
            const agencia = new Agencia(registro.cod_ag, registro.endereco, registro.cidade, registro.uf, registro.telefone);
            listaAgencias.push(agencia);
        }
        conexao.release();
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
                const sql = 'UPDATE Agencia SET endereco = ?, cidade = ?, uf = ?, telefone = ? WHERE cod_ag = ?';
                const parametros = [agencia.endereco, agencia.cidade, agencia.uf, agencia.telefone, agencia.cod_ag];
                await conexao.execute(sql, parametros);
                await conexao.commit();
            }
            catch (erro)
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
                const sql = 'DELETE FROM Agencia WHERE cod_ag = ?';
                const parametros = [agencia.cod_ag];
                await conexao.execute(sql, parametros);
                await conexao.commit();
            }
            catch (erro)
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
