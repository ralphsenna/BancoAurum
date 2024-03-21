import Usuario from '../Modelo/Usuario.js';
import Agencia from '../Modelo/Agencia.js';
import conectar from './Conexao.js';

export default class UsuarioBD 
{
    // Cadastra Usuario no banco de dados
    async cadastrar(usuario) 
    {
        if (usuario instanceof Usuario) 
        {
            const sql = 'INSERT INTO Usuario (nome, cpf, rg, dataNasc, endereco, cidade, uf, email, telefone, cod_ag) VALUES (?,?,?,?,?,?,?,?,?,?)';
            const parametros = [usuario.nome, usuario.cpf, usuario.rg, usuario.dataNasc, usuario.endereco, usuario.cidade, usuario.uf, usuario.email, usuario.telefone, usuario.agencia.cod_ag];
            const conexao = await conectar();
            const retorno = await conexao.execute(sql, parametros);
            usuario.cod_usu = retorno[0].insertId;
            global.poolConexoes.pool.releaseConnection(conexao);
        }
    }

    // Consulta Usuario(s) com ou sem parametros no banco de dados
    async consultar(paramConsulta) 
    {
        let sql = '';
        let parametros = [];
        if (Object.keys(paramConsulta).length === 0)
        {
            sql = 'SELECT * FROM Usuario';
        }
        else
        {
            const coluna = Object.keys(paramConsulta);
            sql = `SELECT * FROM Usuario c
                INNER JOIN Agencia a ON c.cod_ag = a.cod_ag
                WHERE ${coluna} = ?`;
        }
        parametros = Object.values(paramConsulta);
        const conexao = await conectar();
        const [registros] = await conexao.execute(sql, parametros);
        const listaUsuarios = [];
        for (const registro of registros)
        {
            const agencia = new Agencia(registro.cod_ag, registro.endereco, registro.cidade, registro.uf);
            const usuario = new Usuario(registro.cod_usu, registro.nome, registro.cpf, registro.rg, registro.dataNasc, registro.endereco, registro.cidade, registro.uf, registro.email, registro.telefone, agencia);
            listaUsuarios.push(usuario);
        }
        global.poolConexoes.pool.releaseConnection(conexao);
        return listaUsuarios;
    }

    // Altera Usuario no banco de dados
    async alterar(usuario) 
    {
        if (usuario instanceof Usuario) 
        {
            const sql = 'UPDATE Usuario SET endereco = ?, cidade = ?, uf = ?, email = ?, telefone = ?, cod_ag = ? WHERE cod_usu = ?';
            const parametros = [usuario.endereco, usuario.cidade, usuario.uf, usuario.email, usuario.telefone, usuario.agencia.cod_ag, usuario.cod_usu];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.pool.releaseConnection(conexao);
        }
    }

    // Exclui Usuario no banco de dados
    async excluir(usuario) 
    {
        if (usuario instanceof Usuario) 
        {
            const sql = 'DELETE FROM Usuario WHERE cod_usu = ?';
            const parametros = [usuario.cod_usu];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.pool.releaseConnection(conexao);
        }
    }

    /* // ------------------------------------ASSOCIAR PRODUTO A CLIENTE------------------------------------
    async associarProdutoUsuario(usuario_produto) {
        if (usuario_produto instanceof Usuario_Produto) {
            const conexao = await conectar();
            const sql = 'INSERT INTO Usuario_Produto (cod_usu, cod_prod) VALUES(?,?)';
            const parametros = [usuario_produto.cod_usu, usuario_produto.cod_prod];
            await conexao.execute(sql, parametros);
        }
    } */
}
