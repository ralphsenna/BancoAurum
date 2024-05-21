import AgenciaDAO from '../Persistencia/AgenciaDAO.js';

export default class AgenciaProduto 
{
    // Atributos privados da classe AgenciaProduto
    #agencia
    #produto
    #data_adesao

    // Construtor que inicializa os atributos da classe AgenciaProduto
    constructor(agencia={}, produto={}, data_adesao='')
    {
        this.#agencia = agencia;
        this.#produto = produto;
        this.#data_adesao = data_adesao;
    }

    // Métodos publicos (Gets e Sets)
    get agencia()
    {
        return this.#agencia;
    }
    set agencia(novaAgencia)
    {
        this.#agencia = novaAgencia;
    }

    get produto()
    {
        return this.#produto;
    }
    set produto(novoProduto)
    {
        this.#produto = novoProduto;
    }

    get data_adesao()
    {
        return this.#data_adesao;
    }
    set data_adesao(novaData)
    {
        this.#data_adesao = novaData;
    }
    
    // Método de conversão de dados para o formato JSON
    toJSON() 
    {
        return {
            agencia: this.#agencia,
            produto: this.#produto,
            data_adesao: this.#data_adesao
        };
    }

    
    // Chama a função de cadastro de produto em agência diretamente no banco de dados
    async cadastrar() 
    {
        const agenciaDAO = new AgenciaDAO();
        await agenciaDAO.cadastrarProduto(this);
    }

    // Chama a função de alteração de produto da agência diretamente no banco de dados
    async alterar()
    {
        const agenciaDAO = new AgenciaDAO();
        await agenciaDAO.alterarProduto(this);
    }

    // Chama a função de exclusão de produto da agência diretamente no banco de dados
    async excluir() 
    {
        const agenciaDAO = new AgenciaDAO();
        await agenciaDAO.excluirProduto(this);
    } 
}
