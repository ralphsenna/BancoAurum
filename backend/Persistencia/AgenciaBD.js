import Agencia from '../Modelo/Agencia.js';
import conectar from './Conexao.js';

export default class AgenciaBD 
{
    // Cadastra Agencia no banco de dados
    async cadastrar(agencia) 
    {
        if (agencia instanceof Agencia) 
        {
            const sql = 'INSERT INTO Agencia (endereco, cidade, uf, telefone) VALUES(?,?,?,?)';
            const parametros = [agencia.endereco, agencia.cidade, agencia.uf, agencia.telefone];
            const conexao = await conectar();            
            const retorno = await conexao.execute(sql, parametros);
            agencia.cod_ag = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    // Consulta Agencia(s) com ou sem parametros no banco de dados
    async consultar(paramConsulta) 
    {
        let sql = '';
        if (Object.keys(paramConsulta).length === 0)
        {
            sql = 'SELECT * FROM Agencia';
        }
        else
        {
            sql = 'SELECT * FROM Agencia WHERE cidade like %?%';
        }
        const conexao = await conectar();
        const [registros] = await conexao.execute(sql, paramConsulta);
        const listaAgencias = [];
        for (const registro of registros) 
        {
            const agencia = new Agencia(registro.cod_ag, registro.endereco, registro.cidade, registro.uf, registro.telefone);
            listaAgencias.push(agencia);
        }
        return listaAgencias;
    }

    // Altera Agencia no banco de dados
    async alterar(agencia) 
    {
        if (agencia instanceof Agencia) 
        {
            const sql = 'UPDATE Agencia SET endereco = ?, telefone = ? WHERE cod_ag = ?';
            const parametros = [agencia.endereco, agencia.telefone, agencia.cod_ag];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    // Exclui Agencia no banco de dados
    async excluir(agencia) 
    {
        if (agencia instanceof Agencia) 
        {
            const sql = 'DELETE FROM Agencia WHERE cod_ag = ?';
            const parametros = [agencia.cod_ag];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    /* // ------------------------------------ASSOCIAR PRODUTO A AGÊNCIA------------------------------------
    async associarProdutoAgencia(agencia_produto) {
        if (agencia_produto instanceof Agencia_Produto) {
            const conexao = await conectar();
            const sql = 'INSERT INTO Agencia_Produto (cod_ag, cod_prod) VALUES(?,?)';
            const parametros = [agencia_produto.cod_ag, agencia_produto.cod_prod];
            await conexao.execute(sql, parametros);
        }
    } */
}
