import Produto from '../Modelo/Produto.js';
import conectar from './Conexao.js';

// export default class Ag_Prod_BD {
//   async gravar(ag_prod) {
//     if (ag_prod instanceof Produto) {
//       // INSERIR NA TABELA Agencia_Produto
//       const conexao = await conectar();
//       conexao.beginTransaction();
//       try {
//         //   INSERIR NA TABELA (?)
//         const sql = 'INSERT INTO Agencia_Produto(cod_ag, cod_prod) VALUES(?,?)';
//         const parametros = [Agencia_Produto.cod_ag, Agencia_Produto.cod_prod];
//         const retorno = await conexao.execute(sql, parametros);
//         Agencia_Produto;
//         conexao.commit(); //se chegou até aqui sem erros, confirma as inclusões
//       } catch (error) {
//         conexao.rollback();
//       } finally {
//       }
//     }
//   }
// }

export default class PedidoBD {
    async gravar(pedido) {
        // Um pedido no banco de dados grava registro na tabela pedido e também na tabela pedido_produto
        if (pedido instanceof Pedido) {
            const conexao = await conectar();
            // Garantir a transação das operações para que seja realizada de forma atômica
            await conexao.beginTransaction();
            try {
                // Inserir na tabela pedido
                const sql = 'INSERT INTO pedido(cliente_codigo, data_pedido, total) VALUES (?,?,?)';
                const parametros = [pedido.cliente.codigo, pedido.data, pedido.total];
                const retorno = await conexao.execute(sql, parametros);
                pedido.codigo = retorno[0].insertId;

                // Inserir na tabela item_pedido
                const sql2 = 'INSERT INTO pedido_produto(pedido_codigo, produto_codigo, quantidade, preco_unitario) VALUES (?,?,?,?)';
                for (const item of pedido.itens) {
                    let parametros2 = [pedido.codigo, item.produto.codigo, item.quantidade, item.precoUnitario];
                    await conexao.execute(sql2, parametros2);
                }
                await conexao.commit(); //Se chegou até aqui sem erros, confirmaremos as inclusões
            } catch (error) {
                await conexao.rollback(); //Volta o banco de dados ao estado anterior
            }
        }
    }

    async consultar(termoBusca) {
        if (!isNaN(termoBusca)) {
            const conexao = await conectar();
            const sql = `SELECT p.codigo, p.cliente_codigo, p.data_pedido, p.total, c.nome, c.endereco, c.telefone, prod.prod_descricao, prod.prod_precoCusto, 
        prod.prod_precoVenda, prod.prod_dataValidade, prod.prod_qtdEstoque, cat.cat_codigo, cat.cat_descricao, i.produto_codigo,
        i.quantidade, i.preco_unitario, i.quantidade * i.preco_unitario AS subtotal
        FROM pedido AS p
        INNER JOIN cliente AS c ON p.cliente_codigo = c.codigo
        INNER JOIN pedido_produto as i ON i.pedido_codigo = p.codigo
        INNER JOIN produto AS prod ON prod.prod_codigo = i.produto_codigo
        INNER JOIN categoria AS cat ON prod.cat_codigo = cat.cat_codigo
        WHERE p.codigo = 1`;
            const [registros, campos] = await global.conexao.execute(sql, [termoBusca]);

            // A partir dos registros precisaremos restaurar os objetos
            const cliente = new Cliente(registro[0].nome, registro[0].endereco, registro[0].telefone);
            let listaItensPedido = []
            for (const registro of registros) {
                const categoria = new Categoria(...)
                const produto = new Produto(...);
                const itemPedido = new ItemPedido(...)
                listaItensPedido.push(itemPedido)
            }
            const pedido = new Pedido(registros[0].codigo, cliente, registros[0].data_pedido, registros[0].total);
            listaPedidos.push(pedido)
        }
        return listaPedidos
    }
}
