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
                const sql = `INSERT INTO Usuario (usu_tipo, usu_nome, usu_cpf, usu_rg, usu_genero, usu_telefone, 
                             usu_data_nascimento, usu_cep, usu_endereco, usu_cidade, usu_uf, usu_email, usu_senha, ag_codigo)
                             VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
                const parametros = [usuario.tipo, usuario.nome, usuario.cpf, usuario.rg, usuario.genero, usuario.telefone,
                                    usuario.data_nascimento, usuario.cep, usuario.endereco, usuario.cidade, usuario.uf, 
                                    usuario.email, usuario.senha, usuario.agencia.codigo];
                const retorno = await conexao.execute(sql, parametros);
                usuario.codigo = retorno[0].insertId;
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
    async consultar(termo) 
    {
        let sql = '';
        let parametros = [];
        if (Object.keys(termo).length===0)
            sql = `SELECT * FROM Usuario c
                   INNER JOIN Agencia a ON c.ag_codigo = a.ag_codigo`;
        /* else if (Object.keys(termo)==='AUTO_INCREMENT')
        {
            sql = `SELECT AUTO_INCREMENT 
                   FROM INFORMATION_SCHEMA.TABLES 
                   WHERE TABLE_NAME = 'Usuario'`;
        } */
        else 
        {
            const coluna = Object.keys(termo);
            sql = `SELECT * FROM Usuario c
                   INNER JOIN Agencia a ON c.ag_codigo = a.ag_codigo
                   WHERE ${coluna} = ?`;
        }
        parametros = Object.values(termo);
        const conexao = await conectar();
        const [registros] = await conexao.execute(sql, parametros);
        const listaUsuarios = [];
        for (const registro of registros)
        {
            const agencia = new Agencia(registro.ag_codigo, registro.ag_numero, registro.ag_telefone, registro.ag_email, 
                                        registro.ag_cep, registro.ag_endereco, registro.ag_cidade, registro.ag_uf);
            registro.usu_data_nascimento = registro.usu_data_nascimento.toISOString().split('T')[0];
            const usuario = new Usuario(registro.usu_codigo, registro.usu_tipo, registro.usu_nome, registro.usu_cpf, 
                                        registro.usu_rg, registro.usu_genero, registro.usu_telefone, registro.usu_data_nascimento,
                                        registro.usu_cep, registro.usu_endereco, registro.usu_cidade, registro.usu_uf,
                                        registro.usu_email, registro.usu_senha, agencia);
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
                const sql = `UPDATE Usuario SET usu_tipo = ?, usu_telefone = ?, usu_cep = ?, usu_endereco = ?,
                             usu_cidade = ?, usu_uf = ?, usu_email = ?, usu_senha = ?, ag_codigo = ?
                             WHERE usu_codigo = ?`;
                const parametros = [usuario.tipo, usuario.telefone, usuario.cep, usuario.endereco, usuario.cidade, 
                                    usuario.uf, usuario.email, usuario.senha, usuario.agencia.codigo, usuario.codigo];
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
                const sql = 'DELETE FROM Usuario WHERE usu_codigo = ?';
                const parametros = [usuario.codigo];
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
