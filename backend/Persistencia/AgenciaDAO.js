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

    // Consulta Agencia(s) com ou sem parametros no banco de dados
    async consultar(paramConsulta) 
    {
        let sql = '';
        let parametros = [];
        if (Object.keys(paramConsulta).length===0)
            sql = 'SELECT * FROM Agencia';
        else
        {
            const coluna = Object.keys(paramConsulta);
            sql = 'SELECT * FROM Agencia WHERE '+ coluna +' = ?';
        }
        parametros = Object.values(paramConsulta);
        const conexao = await conectar();
        const [registros] = await conexao.execute(sql, parametros);
        const listaAgencias = [];
        for (const registro of registros) 
        {
            const agencia = new Agencia(registro.ag_codigo, registro.ag_numero, registro.ag_telefone, registro.ag_email, 
                                        registro.ag_cep, registro.ag_endereco, registro.ag_cidade, registro.ag_uf);
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
}
