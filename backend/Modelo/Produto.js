import ProdutoBD from '../Persistencia/ProdutoBD.js';

export default class Produto 
{
    #cod_prod;
    #nome;

    // Construtor que inicializa os atributos da classe Produto
    constructor(cod_prod=0, nome='') 
    {
        this.#cod_prod = cod_prod;
        this.#nome = nome;
    }

    // Métodos publicos (Gets, Sets e metodo de conversão para JSON)
    get cod_prod() 
    {
        return this.#cod_prod;
    }
    set cod_prod(novoCodigo) 
    {
        this.#cod_prod = novoCodigo;
    }

    get nome() 
    {
        return this.#nome;
    }
    set nome(novoNome) 
    {
        this.#nome = novoNome;
    }

    toJSON() 
    {
        return {
            cod_prod: this.#cod_prod,
            nome: this.#nome
        };
    }
    

    // Métodos de persistência (CRUD de Produto)
    // Chama a função cadatro de produto diretamente do banco de dados
    async cadastrarBD() 
    {
        const produtoBD = new ProdutoBD();
        await produtoBD.cadastrar(this);
    }

    // Chama a função de consulta de produto diretamente no banco de dados
    async consultarBD(paramConsulta) 
    {
        const produtoBD = new ProdutoBD();
        return await produtoBD.consultar(paramConsulta);
    }

    // Chama a função de alteração de produto diretamente no banco de dados  
    async alterarBD() 
    {
        const produtoBD = new ProdutoBD();
        await produtoBD.alterar(this);
    }

    // Chama a função de exclusão de produto diretamente no banco de dados
    async excluirBD() 
    {
        const produtoBD = new ProdutoBD();
        await produtoBD.excluir(this);
    }
}
