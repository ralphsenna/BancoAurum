import AgenciaDAO from '../Persistencia/AgenciaDAO.js';

export default class Agencia 
{
    // Atributos privados da classe Agencia
    #codigo
    #numero
    #telefone
    #email
    #cep
    #endereco
    #cidade
    #uf
    #produtos

    // Construtor que inicializa os atributos da classe Agencia
    constructor(codigo=0, numero=0, telefone='', email='', cep='', endereco='', cidade='', uf='', produtos={})
    {
        this.#codigo = codigo;
        this.#numero = numero;
        this.#telefone = telefone;
        this.#email = email;
        this.#cep = cep;
        this.#endereco = endereco;
        this.#cidade = cidade;
        this.#uf = uf;
        this.#produtos = produtos;
    }

    // Métodos públicos (Gets e Sets)
    get codigo() 
    {
        return this.#codigo;
    }
    set codigo(novoCodigo) 
    {
        this.#codigo = novoCodigo;
    }

    get numero()
    {
        return this.#numero;
    }
    set numero(novoNumero)
    {
        this.#numero = novoNumero;
    }

    get telefone()
    {
        return this.#telefone;
    }
    set telefone(novoTelefone)
    {
        this.#telefone = novoTelefone;
    }

    get email()
    {
        return this.#email;
    }
    set email(novoEmail)
    {
        this.#email = novoEmail;
    }

    get cep()
    {
        return this.#cep;
    }
    set cep(novoCep)
    {
        this.#cep = novoCep;
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

    get produtos()
    {
        return this.#produtos;
    }
    set produtos(novosProdutos)
    {
        this.#produtos = novosProdutos;
    }


    // Métodos de persistência (CRUD de Agencia) e conversão de dados para o formato JSON
    toJSON() 
    {
        return {
            codigo: this.#codigo,
            numero: this.#numero,
            telefone: this.#telefone,
            email: this.#email,
            cep: this.#cep,
            endereco: this.#endereco,
            cidade: this.#cidade,
            uf: this.#uf,
            produtos: this.#produtos
        };
    }
   
    // Chama a função de cadastro de agencia diretamente no banco de dados
    async cadastrar() 
    {
        const agenciaDAO = new AgenciaDAO();
        await agenciaDAO.cadastrar(this);
    }

    // Chama a função de consulta de agencia diretamente no banco de dados
    async consultar(termo) 
    {
        const agenciaDAO = new AgenciaDAO();
        return await agenciaDAO.consultar(termo);
    }

    // Chama a função de alteração de agencia diretamente no banco de dados
    async alterar() 
    {
        const agenciaDAO = new AgenciaDAO();
        await agenciaDAO.alterar(this);
    }

    // Chama a função de exclusão de agencia diretamente no banco de dados
    async excluir() 
    {
        const agenciaDAO = new AgenciaDAO();
        await agenciaDAO.excluir(this);
    }
}
