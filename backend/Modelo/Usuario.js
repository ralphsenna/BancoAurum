import UsuarioBD from '../Persistencia/UsuarioDAO.js';

export default class Usuario 
{
    #codigo;
    #tipo
    #nome;
    #cpf;
    #rg;
    #genero;
    #telefone;
    #data_nascimento;
    #cep;
    #endereco;
    #cidade;
    #uf;
    #email;
    #senha;
    #agencia
    #produtos;

    // Construtor que inicializa os atributos da classe Usuario
    constructor(codigo=0, tipo='', nome='', cpf='', rg='', genero='', telefone='', data_nascimento='', 
                cep='', endereco='', cidade='', uf='', email='', senha='', agencia={}, produtos={})
    {
        this.#codigo = codigo;
        this.#tipo = tipo;
        this.#nome = nome;
        this.#cpf = cpf;
        this.#rg = rg;
        this.#genero = genero;
        this.#telefone = telefone;
        this.#data_nascimento = data_nascimento;
        this.#cep = cep;
        this.#endereco = endereco;
        this.#cidade = cidade;
        this.#uf = uf;
        this.#email = email;
        this.#senha = senha;
        this.#agencia = agencia;
        this.#produtos = produtos;
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

    get genero()
    {
        return this.#genero;
    }
    set genero(novoGenero)
    {
        this.#genero = novoGenero;
    }

    get telefone() 
    {
        return this.#telefone;
    }
    set telefone(novoTelefone)
    {
        this.#telefone = novoTelefone;
    }

    get data_nascimento()
    {
        return this.#data_nascimento;
    }
    set data_nascimento(novaData)
    {
        this.#data_nascimento = novaData;
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

    get email() 
    {
        return this.#email;
    }
    set email(novoEmail) 
    {
        this.#email = novoEmail;
    }

    get senha()
    {
        return this.#senha;
    }
    set senha(novaSenha)
    {
        this.#senha = novaSenha;
    }
    
    get agencia()
    {
        return this.#agencia;
    }
    set agencia(novaAgencia)
    {
        this.#agencia = novaAgencia;
    }

    get produtos()
    {
        return this.#produtos;
    }
    set produtos(novosProdutos)
    {
        this.#produtos = novosProdutos;
    }


    // Métodos de persistência (CRUD de Usuario) e conversão de dados para o formato JSON
    toJSON() 
    {
        return {
            codigo: this.#codigo,
            tipo: this.#tipo,
            nome: this.#nome,
            cpf: this.#cpf,
            rg: this.#rg,
            genero: this.#genero,
            telefone: this.#telefone,
            data_nascimento: this.#data_nascimento,
            cep: this.#cep,
            endereco: this.#endereco,
            cidade: this.#cidade,
            uf: this.#uf,
            email: this.#email,
            senha: this.#senha,
            agencia: this.#agencia,
            produtos: this.#produtos
        };
    }

    // Chama a função de cadastro de usuario diretamente no banco de dados
    async cadastrar() 
    {
        const usuarioBD = new UsuarioBD();
        await usuarioBD.cadastrar(this);
    }

    // Chama a função de consulta de usuario diretamente no banco de dados
    async consultar(termo) 
    {
        const usuarioBD = new UsuarioBD();
        return await usuarioBD.consultar(termo);
    }

    // Chama a função de alteração de usuario diretamente no banco de dados
    async alterar() 
    {
        const usuarioBD = new UsuarioBD();
        await usuarioBD.alterar(this);
    }

    // Chama a função de exclusão de usuario diretamente no banco de dados
    async excluir() 
    {
        const usuarioBD = new UsuarioBD();
        await usuarioBD.excluir(this);
    }
}
