export default class Agencia_Produto {
    #cod_ag;
    #cod_prod;

    constructor(cod_ag, cod_prod) {
        this.#cod_ag = cod_ag;
        this.#cod_prod = cod_prod;
    }

    // MÉTODOS PÚBLICOS

    // CÓDIGO DA AGÊNCIA
    get cod_ag() {
        return this.#cod_ag;
    }
    set cod_ag(novoCod_Ag) {
        this.#cod_ag = novoCod_Ag;
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
            cod_ag: this.#cod_ag,
            cod_prod: this.#cod_prod,
        };
    }
}
