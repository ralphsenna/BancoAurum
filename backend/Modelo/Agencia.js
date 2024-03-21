import AgenciaBD from '../Persistencia/AgenciaBD.js';

export default class Agencia 
{
    #cod_ag;
    #endereco;
    #cidade;
    #uf;
    #telefone
    #produtos;

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

    // Métodos publicos (Gets, Sets e metodo de conversão para JSON)
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
    

    // Métodos de persistência (CRUD de Agência)
    // Chama a função de cadastro de agência diretamente no banco de dados
    async cadastrarBD() 
    {
        const agenciaBD = new AgenciaBD();
        await agenciaBD.cadastrar(this);
    }

    // Chama a função de consulta de agência diretamente no banco de dados
    async consultarBD(paramConsulta) 
    {
        const agenciaBD = new AgenciaBD();
        return await agenciaBD.consultar(paramConsulta);
    }

    // Chama a função de alteração de agência diretamente no banco de dados
    async alterarBD() 
    {
        const agenciaBD = new AgenciaBD();
        await agenciaBD.alterar(this);
    }

    // Chama a função de exclusão de agência diretamente no banco de dados
    async excluirBD() 
    {
        const agenciaBD = new AgenciaBD();
        await agenciaBD.excluir(this);
    }
}
