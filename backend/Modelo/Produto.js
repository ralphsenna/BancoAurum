import ProdutoBD from '../Persistencia/ProdutoDAO.js';

export default class Produto 
{
    #cod_prod
    #descricao

    // Construtor que inicializa os atributos da classe Produto
    constructor(cod_prod=0, descricao='') 
    {
        this.#cod_prod = cod_prod;
        this.#descricao = descricao;
    }

    // Métodos publicos (Gets e Sets)
    get cod_prod() 
    {
        return this.#cod_prod;
    }
    set cod_prod(novoCodigo) 
    {
        this.#cod_prod = novoCodigo;
    }

    get descricao() 
    {
        return this.#descricao;
    }
    set descricao(novDescricao) 
    {
        this.#descricao = novDescricao;
    }


    // Métodos de persistência (CRUD de Produto) e conversão de dados para o formato JSON
    toJSON() 
    {
        return {
            cod_prod: this.#cod_prod,
            descricao: this.#descricao
        };
    }

    // Chama a função cadatro de produto diretamente do banco de dados
    async cadastrar() 
    {
        const produtoBD = new ProdutoBD();
        await produtoBD.cadastrar(this);
    }

    // Chama a função de consulta de produto diretamente no banco de dados
    async consultar(paramConsulta) 
    {
        const produtoBD = new ProdutoBD();
        return await produtoBD.consultar(paramConsulta);
    }

    // Chama a função de alteração de produto diretamente no banco de dados  
    async alterar() 
    {
        const produtoBD = new ProdutoBD();
        await produtoBD.alterar(this);
    }

    // Chama a função de exclusão de produto diretamente no banco de dados
    async excluir() 
    {
        const produtoBD = new ProdutoBD();
        await produtoBD.excluir(this);
    }
}
