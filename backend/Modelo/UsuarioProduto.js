export default class UsuarioProduto
{
    #cod_cli;
    #cod_prod;

    constructor(cod_cli, cod_prod) {
        this.#cod_cli = cod_cli;
        this.#cod_prod = cod_prod;
    }

    // MÉTODOS PÚBLICOS

    // CÓDIGO DA AGÊNCIA
    get cod_cli() {
        return this.#cod_cli;
    }
    set cod_cli(novoCod_Cli) {
        this.#cod_cli = novoCod_Cli;
    }

    // CÓDIGO DO PRODUTO
    get cod_prod() {
        return this.#cod_prod;
    }
    set cod_prod(novoCod_Prod) {
        this.#cod_prod = novoCod_Prod;
    }

    toJSON() {
        return {
            cod_cli: this.#cod_cli,
            cod_prod: this.#cod_prod,
        };
    }
}
