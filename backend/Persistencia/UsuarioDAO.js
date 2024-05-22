import Agencia from '../Modelo/Agencia.js';
import Usuario from '../Modelo/Usuario.js';
import Produto from '../Modelo/Produto.js';
import UsuarioProduto from '../Modelo/UsuarioProduto.js';
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

    // Cadastro Produto no Usuario no banco de dados
    async cadastrarProduto(usuarioProduto) 
    {
        if (usuarioProduto instanceof UsuarioProduto) 
        {
            const conexao = await conectar();
            await conexao.beginTransaction();
            try
            {
                const sql = `INSERT INTO Usuario_Produto (usu_codigo, pro_codigo, up_data_contratacao, up_saldo, up_valor_final)
                             VALUES (?,?,?,?,?)`;
                const parametros = [usuarioProduto.usuario.codigo, usuarioProduto.produto.codigo, usuarioProduto.data_contratacao,
                                    usuarioProduto.saldo, usuarioProduto.valor_final];
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

    // Consulta Usuario(s) com ou sem parametros no banco de dados
    async consultar(termo) 
    {
        let sql = '';
        let parametros = [];
        const listaUsuarios = [];
        const listaProdutos = [];
        if (!isNaN(parseInt(termo)))
        {
            parametros = [termo];
            sql = `SELECT * FROM Usuario_Produto as up
                   INNER JOIN Usuario c ON c.usu_codigo = up.usu_codigo
                   INNER JOIN Agencia a ON a.ag_codigo = c.ag_codigo
                   INNER JOIN Produto p ON p.pro_codigo = up.pro_codigo
                   WHERE up.usu_codigo = ?`;
        }       
        else if (Object.keys(termo).length>0) 
        {
            const coluna = termo.split(':')[0];
            parametros = [termo.split(':')[1]];
            sql = `SELECT * FROM Usuario c
                   INNER JOIN Agencia a ON a.ag_codigo = c.ag_codigo
                   WHERE ${coluna} = ?`;
        }
        else 
        {
            sql = `SELECT * FROM Usuario c
                   INNER JOIN Agencia a ON a.ag_codigo = c.ag_codigo`;
        }
        const conexao = await conectar();
        const [registros] = await conexao.execute(sql, parametros);
        if (!isNaN(parseInt(termo)) && registros.length>0)
        {
            const agencia = new Agencia(registros[0].ag_codigo, registros[0].ag_numero, registros[0].ag_telefone, registros[0].ag_email,
                                        registros[0].ag_cep, registros[0].ag_endereco, registros[0].ag_cidade, registros[0].ag_uf);
            const usuario = new Usuario(registros[0].usu_codigo, registros[0].usu_tipo, registros[0].usu_nome, registros[0].usu_cpf,
                                        registros[0].usu_rg, registros[0].usu_genero, registros[0].usu_telefone, registros[0].usu_data_nascimento,
                                        registros[0].usu_cep, registros[0].usu_endereco, registros[0].usu_cidade, registros[0].usu_uf,
                                        registros[0].usu_email, registros[0].usu_senha, agencia);
            for (const registro of registros)
            {
                const produto = new Produto(registro.pro_codigo, registro.pro_tipo, registro.pro_nome, registro.pro_limite, registro.pro_valor, registro.pro_juros);
                registro.up_data_contratacao = registro.up_data_contratacao.toISOString().split('T')[0];
                const produtoUsuario = new UsuarioProduto(usuario, produto, registro.up_data_contratacao, registro.up_saldo, registro.up_valor_final);
                listaProdutos.push(produtoUsuario);
            }
        }
        else
        {
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
        }
        conexao.release();
        if (!isNaN(parseInt(termo)))
            return listaProdutos;
        else    
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

    // Altera Produto do Usuario no banco de dados
    async alterarProduto(usuarioProduto) 
    {
        if (usuarioProduto instanceof UsuarioProduto) 
        {
            const conexao = await conectar();
            await conexao.beginTransaction();
            try
            {
                const sql = `UPDATE Usuario_Produto SET up_data_contratacao = ?, up_saldo = ?
                             WHERE usu_codigo = ? AND pro_codigo = ?`;
                const parametros = [usuarioProduto.data_contratacao, usuarioProduto.saldo,
                                    usuarioProduto.usuario.codigo, usuarioProduto.produto.codigo];
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

    // Exclui Produto do Usuario no banco de dados
    async excluirProduto(usuarioProduto) 
    {
        if (usuarioProduto instanceof UsuarioProduto) 
        {
            const conexao = await conectar();
            await conexao.beginTransaction();
            try
            {
                const sql = 'DELETE FROM Usuario_Produto WHERE usu_codigo = ? AND pro_codigo = ?';
                const parametros = [usuarioProduto.usuario.codigo, usuarioProduto.produto.codigo];
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
