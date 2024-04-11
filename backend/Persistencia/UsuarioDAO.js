import Usuario from '../Modelo/Usuario.js';
import Agencia from '../Modelo/Agencia.js';
import conectar from './Conexao.js';

export default class UsuarioDAO
{
    // Cadastra Usuario no banco de dados
    async cadastrar(usuario) 
    {
        if (usuario instanceof Usuario) 
        {
            const conexao = await conectar();
            await conexao.beginTransaction();
            try
            {
                const sql = `INSERT INTO Usuario (nome, cpf, rg, dataNasc, endereco, cidade, uf, telefone, tipo, email, senha, cod_ag) 
                             VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`;
                const parametros = [usuario.nome, usuario.cpf, usuario.rg, usuario.dataNasc, usuario.endereco, 
                                    usuario.cidade, usuario.uf, usuario.telefone, usuario.tipo, usuario.email, 
                                    usuario.senha, usuario.agencia.cod_ag];
                const retorno = await conexao.execute(sql, parametros);
                usuario.cod_usu = retorno[0].insertId;
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

    // Consulta Usuario(s) com ou sem parametros no banco de dados
    async consultar(paramConsulta) 
    {
        let sql = '';
        let parametros = [];
        if (Object.keys(paramConsulta).length===0)
            sql = `SELECT * FROM Usuario c
                   INNER JOIN Agencia a ON c.cod_ag = a.cod_ag`;
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
            const agencia = new Agencia(registro.cod_ag, registro.endereco, registro.cidade, registro.uf, registro.telefone);
            registro.dataNasc = registro.dataNasc.toISOString().split('T')[0];
            const usuario = new Usuario(registro.cod_usu, registro.nome, registro.cpf, registro.rg, registro.dataNasc, 
                                        registro.endereco, registro.cidade, registro.uf, registro.telefone, 
                                        registro.tipo, registro.email, registro.senha, agencia);
            listaUsuarios.push(usuario);
        }
        conexao.release();
        return listaUsuarios;
    }

    // Altera Usuario no banco de dados
    async alterar(usuario) 
    {
        if (usuario instanceof Usuario) 
        {
            const conexao = await conectar();
            await conexao.beginTransaction();
            try
            {
                const sql = `UPDATE Usuario SET nome = ?, cpf = ?, rg = ?, dataNasc = ?, endereco = ?, cidade = ?,
                             uf = ?, telefone = ?, tipo = ?, email = ?, senha = ?, cod_ag = ? WHERE cod_usu = ?`;
                const parametros = [usuario.nome, usuario.cpf, usuario.rg, usuario.dataNasc, usuario.endereco, usuario.cidade, usuario.uf, 
                                    usuario.telefone, usuario.tipo, usuario.email, usuario.senha, usuario.agencia.cod_ag, usuario.cod_usu];
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

    // Exclui Usuario no banco de dados
    async excluir(usuario) 
    {
        if (usuario instanceof Usuario) 
        {
            const conexao = await conectar();
            await conexao.beginTransaction();
            try
            {
                const sql = 'DELETE FROM Usuario WHERE cod_usu = ?';
                const parametros = [usuario.cod_usu];
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
