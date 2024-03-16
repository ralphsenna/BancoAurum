import Produto from '../Modelo/Produto.js';
import conectar from './Conexao.js';

export default class ProdutoBD {
    // CADASTRAR PRODUTO NO BANCO DE DADOS

    // EM CÓDIGOS AUTOINCREMENT, NÃO COLOCAR NO INSERT O CÓDIGO
    async cadastrar(produto) {
        if (produto instanceof Produto) {
            const conexao = await conectar();
            const sql = 'INSERT INTO Produto (nome) VALUE (?)';
            const parametros = [produto.nome];
            // const parametros = [produto.cod_prod, produto.nome];
            const resultado = await conexao.query(sql, parametros);

            //   CORRIGIR ESSE poolConexoes, o que é?
            // global.poolConexoes.pool.releaseConnection(conexao);
            return await resultado[0].insertId;
        }
    }

    // EXCLUIR PRODUTO DO BANCO DE DADOS
    async excluir(produto) {
        if (produto instanceof Produto) {
            const conexao = await conectar();
            const sql = 'DELETE FROM Produto WHERE cod_prod=?';
            const parametros = [produto.cod_prod];
            await conexao.query(sql, parametros);

            //   CORRIGIR ESSE poolConexoes, o que é?
            // global.poolConexoes.pool.releaseConnection(conexao);
        }
    }

    // CONSULTAR PRODUTO NO BANCO DE DADOS
    async consultar() {
        const conexao = await conectar();
        const sql = 'SELECT * FROM Produto';
        const parametros = ['%'];
        const [rows] = await conexao.query(sql, parametros);
        const listaProdutos = [];
        for (const row of [rows]) {
            const produto = new Produto(row['cod_prod'], row['nome']);
            listaProdutos.push(produto);
        }

        //   CORRIGIR ESSE poolConexoes, o que é?
        global.poolConexoes.pool.releaseConnection(conexao);
        return listaProdutos;
    }
}
