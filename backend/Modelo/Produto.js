import ProdutoBD from '../Persistencia/ProdutoDAO.js';

export default class Produto 
{
    #codigo
    #tipo
    #nome
    #limite
    #valor
    #juros

    // Construtor que inicializa os atributos da classe Produto
    constructor(codigo=0, tipo='', nome='', limite=0, valor=0, juros=0)
    {
        this.#codigo = codigo;
        this.#tipo = tipo;
        this.#nome = nome;
        this.#limite = limite;
        this.#valor = valor;
        this.#juros = juros;
    }

    // Métodos publicos (Gets e Sets)
    get codigo()
    {
        return this.#codigo;
    }
    set codigo(novoCodigo)
    {
        this.#codigo = novoCodigo;
    }

    get tipo()
    {
        return this.#tipo;
    }
    set tipo(novoTipo)
    {
        this.#tipo = novoTipo;
    }

    get nome()
    {
        return this.#nome;
    }
    set nome(novoNome)
    {
        this.#nome = novoNome;
    }

    get limite()
    {
        return this.#limite;
    }
    set limite(novoLimite)
    {
        this.#limite = novoLimite;
    }

    get valor()
    {
        return this.#valor;
    }
    set valor(novoValor)
    {
        this.#valor = novoValor;
    }

    get juros()
    {
        return this.#juros;
    }
    set juros(novoJuros)
    {
        this.#juros = novoJuros;
    }

    
    // Métodos de persistência (CRUD de Produto) e conversão de dados para o formato JSON
    toJSON() 
    {
        return {
            codigo: this.#codigo,
            tipo: this.#tipo,
            nome: this.#nome,
            limite: this.#limite,
            valor: this.#valor,
            juros: this.#juros
        };
    }

    // Chama a função de cadastro de produto diretamente do banco de dados
    async cadastrar() 
    {
        const produtoBD = new ProdutoBD();
        await produtoBD.cadastrar(this);
    }

    // Chama a função de consulta de produto diretamente no banco de dados
    async consultar(termo) 
    {
        const produtoBD = new ProdutoBD();
        return await produtoBD.consultar(termo);
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
