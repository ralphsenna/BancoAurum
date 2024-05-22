import UsuarioDAO from '../Persistencia/UsuarioDAO.js';

export default class UsuarioProduto
{
    // Atributos privados da classe UsuarioProduto
    #usuario
    #produto
    #data_contratacao
    #saldo
    #valor_final

    // Construtor que inicializa os atributos da classe UsuarioProduto
    constructor(usuario={}, produto={}, data_contratacao='', saldo=0, valor_final=0)
    {
        this.#usuario = usuario;
        this.#produto = produto;
        this.#data_contratacao = data_contratacao;
        this.#saldo = saldo;
        this.#valor_final = valor_final;
    }

    // Métodos publicos (Gets e Sets)
    get usuario()
    {
        return this.#usuario;
    }
    set usuario(novoUsuario)
    {
        this.#usuario = novoUsuario;
    }

    get produto()
    {
        return this.#produto;
    }
    set produto(novoProduto)
    {
        this.#produto = novoProduto;
    }

    get data_contratacao()
    {
        return this.#data_contratacao;
    }
    set data_contratacao(novaData)
    {
        this.#data_contratacao = novaData;
    }

    get saldo()
    {
        return this.#saldo;
    }
    set saldo(novoSaldo)
    {
        this.#saldo = novoSaldo;
    }

    get valor_final()
    {
        return this.#valor_final;
    }
    set valor_final(novoValor)
    {
        this.#valor_final = novoValor;
    }
    
    // Método de conversão de dados para o formato JSON
    toJSON() 
    {
        return {
            usuario: this.#usuario,
            produto: this.#produto,
            data_contratacao: this.#data_contratacao,
            saldo: this.#saldo,
            valor_final: this.#valor_final
        };
    }

    
    // Chama a função de cadastro de produto no usuário diretamente no banco de dados
    async cadastrar() 
    {
        const usuarioDAO = new UsuarioDAO();
        await usuarioDAO.cadastrarProduto(this);
    }

    // Chama a função de alteração de produto do usuário diretamente no banco de dados
    async alterar()
    {
        const usuarioDAO = new UsuarioDAO();
        await usuarioDAO.alterarProduto(this);
    }

    // Chama a função de exclusão de produto do usuário diretamente no banco de dados
    async excluir() 
    {
        const usuarioDAO = new UsuarioDAO();
        await usuarioDAO.excluirProduto(this);
    }
}
