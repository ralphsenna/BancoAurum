export default class AgenciaProduto 
{
    #agencia;
    #produto;
    #dataContrato;

    // Construtor que inicializa os atributos da classe AgenciaProduto
    constructor(agencia={}, produto={}, dataContrato='')
    {
        this.#agencia=agencia;
        this.#produto=produto;
        this.#dataContrato=dataContrato;
    }

    // Métodos publicos (Gets, Sets e metodo de conversão para JSON)
    get agencia()
    {
        return this.#agencia;
    }
    set agencia(novaAgencia)
    {
        this.#agencia=novaAgencia;
    }

    get produto()
    {
        return this.#produto;
    }
    set produto(novoProduto)
    {
        this.#produto=novoProduto;
    }

    get dataContrato()
    {
        return this.#dataContrato;
    }
    set dataContrato(novaData)
    {
        this.#dataContrato=novaData;
    }

    toJSON() 
    {
        return {
            agencia:this.#agencia,
            produto:this.#produto,
            dataContrato:this.#dataContrato
        };
    }
}
