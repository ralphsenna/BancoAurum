import UsuarioBD from '../Persistencia/UsuarioBD.js';

export default class Usuario 
{
    #cod_cli;
    #nome;
    #cpf;
    #rg
    #dataNasc;
    #endereco;
    #cidade;
    #uf;
    #telefone;
    #tipo;
    #email;
    #senha;
    #agencia
    #produtos;

    // Construtor que inicializa os atributos da classe Usuario
    constructor(cod_cli=0, nome='', cpf='', rg='', dataNasc='', endereco='', cidade='', uf='', email='', telefone='', agencia={}) 
    {
        this.#cod_cli = cod_cli;
        this.#nome = nome;
        this.#cpf = cpf;
        this.#rg = rg;
        this.#dataNasc = dataNasc;
        this.#endereco = endereco;
        this.#cidade = cidade;
        this.#uf = uf;
        this.#email = email;
        this.#telefone = telefone;
        this.#agencia = agencia;
    }

    // Métodos publicos (Gets, Sets e metodo de conversão para JSON)
    get cod_cli() 
    {
        return this.#cod_cli;
    }
    set cod_cli(novoCodigo) 
    {
        this.#cod_cli = novoCodigo;
    }

    get nome() 
    {
        return this.#nome;
    }
    set nome(novoNome) 
    {
        this.#nome = novoNome;
    }

    get cpf() 
    {
        return this.#cpf;
    }
    set cpf(novoCpf) 
    {
        this.#cpf = novoCpf;
    }

    get rg()
    {
        return this.#rg;
    }
    set rg(novoRg)
    {
        this.#rg = novoRg;
    }

    get dataNasc() 
    {
        return this.#dataNasc;
    }
    set dataNasc(novaDataNasc) 
    {
        this.#dataNasc = novaDataNasc;
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

    get email() 
    {
        return this.#email;
    }
    set email(novoEmail) 
    {
        this.#email = novoEmail;
    }

    get telefone() 
    {
        return this.#telefone;
    }
    set telefone(novoTelefone)
    {
        this.#telefone = novoTelefone;
    }

    get agencia()
    {
        return this.#agencia;
    }
    set agencia(novaAgencia)
    {
        this.#agencia = novaAgencia;
    }

    toJSON() 
    {
        return {
            cod_cli: this.#cod_cli,
            nome: this.#nome,
            cpf: this.#cpf,
            rg: this.#rg,
            dataNasc: this.#dataNasc,
            endereco: this.#endereco,
            cidade: this.#cidade,
            uf: this.#uf,
            email: this.#email,
            telefone: this.#telefone,
            agencia: this.#agencia
        };
    }
    

    // Métodos de persistência (CRUD de Usuario)
    // Chama a função de cadastro de usuario diretamente no banco de dados
    async cadastrarBD() 
    {
        const usuarioBD = new UsuarioBD();
        await usuarioBD.cadastrar(this);
    }

    // Chama a função de consulta de usuario diretamente no banco de dados
    async consultarBD(paramConsulta) 
    {
        const usuarioBD = new UsuarioBD();
        return await usuarioBD.consultar(paramConsulta);
    }

    // Chama a função de alteração de usuario diretamente no banco de dados
    async alterarBD() 
    {
        const usuarioBD = new UsuarioBD();
        await usuarioBD.alterar(this);
    }

    // Chama a função de exclusão de usuario diretamente no banco de dados
    async excluirBD() 
    {
        const usuarioBD = new UsuarioBD();
        await usuarioBD.excluir(this);
    }
}
