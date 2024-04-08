import AgenciaDAO from '../Persistencia/AgenciaDAO.js';

export default class Agencia 
{
    #cod_ag
    #endereco
    #cidade
    #uf
    #telefone
    #produtos

    // Construtor que inicializa os atributos da classe Agencia
    constructor(cod_ag=0, endereco='', cidade='', uf='', telefone='', produtos={}) 
    {
        this.#cod_ag = cod_ag;
        this.#endereco = endereco;
        this.#cidade = cidade;
        this.#uf = uf;
        this.#telefone = telefone;
        this.#produtos = produtos;
    }

    // Métodos publicos (Gets e Sets)
    get cod_ag() 
    {
        return this.#cod_ag;
    }
    set cod_ag(novoCodigo) 
    {
        this.#cod_ag = novoCodigo;
    }

    get endereco() 
    {
        return this.#endereco;
    }
    set endereco(novoEndereco) 
    {
        this.#endereco = novoEndereco;
    }

    get cidade() 
    {
        return this.#cidade;
    }
    set cidade(novaCidade) 
    {
        this.#cidade = novaCidade;
    }

    get uf() 
    {
        return this.#uf;
    }
    set uf(novaUf) 
    {
        this.#uf = novaUf;
    }

    get telefone()
    {
        return this.#telefone;
    }
    set telefone(novoTelefone)
    {
        this.#telefone = novoTelefone;
    }

    get produtos()
    {
        return this.#produtos;
    }
    set produtos(novosProdutos)
    {
        this.#produtos = novosProdutos;
    }


    // Métodos de persistência (CRUD de Agência) e conversão de dados para o formato JSON
    toJSON() 
    {
        return {
            cod_ag: this.#cod_ag,
            endereco: this.#endereco,
            cidade: this.#cidade,
            uf: this.#uf,
            telefone: this.#telefone,
            produtos: this.#produtos
        };
    }
   
    // Chama a função de cadastro de agência diretamente no banco de dados
    async cadastrar() 
    {
        const agenciaDAO = new AgenciaDAO();
        await agenciaDAO.cadastrar(this);
    }

    // Chama a função de consulta de agência diretamente no banco de dados
    async consultar(paramConsulta) 
    {
        const agenciaDAO = new AgenciaDAO();
        return await agenciaDAO.consultar(paramConsulta);
    }

    // Chama a função de alteração de agência diretamente no banco de dados
    async alterar() 
    {
        const agenciaDAO = new AgenciaDAO();
        await agenciaDAO.alterar(this);
    }

    // Chama a função de exclusão de agência diretamente no banco de dados
    async excluir() 
    {
        const agenciaDAO = new AgenciaDAO();
        await agenciaDAO.excluir(this);
    }
}
