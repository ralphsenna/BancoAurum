import Cliente from '../Modelo/Cliente.js';
import Agencia from '../Modelo/Agencia.js';
import conectar from './Conexao.js';

export default class ClienteBD 
{
    // Cadastra Cliente no banco de dados
    async cadastrar(cliente) 
    {
        if (cliente instanceof Cliente) 
        {
            const sql = 'INSERT INTO Cliente (nome, cpf, rg, dataNasc, endereco, cidade, uf, email, telefone, cod_ag) VALUES (?,?,?,?,?,?,?,?,?,?)';
            const parametros = [cliente.nome, cliente.cpf, cliente.rg, cliente.dataNasc, cliente.endereco, cliente.cidade, cliente.uf, cliente.email, cliente.telefone, cliente.agencia.cod_ag];
            const conexao = await conectar();
            const retorno = await conexao.execute(sql, parametros);
            cliente.cod_cli = retorno[0].insertId;
            global.poolConexoes.pool.releaseConnection(conexao);
        }
    }

    // Consulta Cliente(s) com ou sem parametros no banco de dados
    async consultar(paramConsulta) 
    {
        let sql = '';
        let parametros = [];
        if (Object.keys(paramConsulta).length === 0)
        {
            sql = 'SELECT * FROM Cliente';
        }
        else
        {
            const coluna = Object.keys(paramConsulta);
            sql = `SELECT * FROM Cliente c
                INNER JOIN Agencia a ON c.cod_ag = a.cod_ag
                WHERE ${coluna} = ?`;
        }
        parametros = Object.values(paramConsulta);
        const conexao = await conectar();
        const [registros] = await conexao.execute(sql, parametros);
        const listaClientes = [];
        for (const registro of registros)
        {
            const agencia = new Agencia(registro.cod_ag, registro.endereco, registro.cidade, registro.uf);
            const cliente = new Cliente(registro.cod_cli, registro.nome, registro.cpf, registro.rg, registro.dataNasc, registro.endereco, registro.cidade, registro.uf, registro.email, registro.telefone, agencia);
            listaClientes.push(cliente);
        }
        global.poolConexoes.pool.releaseConnection(conexao);
        return listaClientes;
    }

    // Altera Cliente no banco de dados
    async alterar(cliente) 
    {
        if (cliente instanceof Cliente) 
        {
            const sql = 'UPDATE Cliente SET endereco = ?, cidade = ?, uf = ?, email = ?, telefone = ?, cod_ag = ? WHERE cod_cli = ?';
            const parametros = [cliente.endereco, cliente.cidade, cliente.uf, cliente.email, cliente.telefone, cliente.agencia.cod_ag, cliente.cod_cli];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.pool.releaseConnection(conexao);
        }
    }

    // Exclui Cliente no banco de dados
    async excluir(cliente) 
    {
        if (cliente instanceof Cliente) 
        {
            const sql = 'DELETE FROM Cliente WHERE cod_cli = ?';
            const parametros = [cliente.cod_cli];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.pool.releaseConnection(conexao);
        }
    }

    /* // ------------------------------------ASSOCIAR PRODUTO A CLIENTE------------------------------------
    async associarProdutoCliente(cliente_produto) {
        if (cliente_produto instanceof Cliente_Produto) {
            const conexao = await conectar();
            const sql = 'INSERT INTO Cliente_Produto (cod_cli, cod_prod) VALUES(?,?)';
            const parametros = [cliente_produto.cod_cli, cliente_produto.cod_prod];
            await conexao.execute(sql, parametros);
        }
    } */
}
