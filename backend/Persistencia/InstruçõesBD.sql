CREATE TABLE Agencia(
    cod_ag INT NOT NULL AUTO_INCREMENT,
    endereco VARCHAR(80) NOT NULL,
    cidade VARCHAR(40) NOT NULL,
    uf VARCHAR(2) NOT NULL,
    telefone VARCHAR(15) NOT NULL,
    CONSTRAINT pk_agencia PRIMARY KEY(cod_ag)
);

CREATE TABLE Usuario(
	cod_usu INT NOT NULL AUTO_INCREMENT,
	nome VARCHAR(60) NOT NULL,
	cpf VARCHAR(14) NOT NULL,
    rg VARCHAR(12) NOT NULL,
	dataNasc DATE NOT NULL,
	endereco VARCHAR(80) NOT NULL,
	cidade VARCHAR(40) NOT NULL,
	uf VARCHAR(2) NOT NULL,
	telefone VARCHAR(15) NOT NULL,
    tipo CHAR(1) NOT NULL,
    email VARCHAR(40) NOT NULL,
    senha VARCHAR(20) NOT NULL,
    cod_ag INT NOT NULL,
    CONSTRAINT pk_usuario PRIMARY KEY(cod_usu),
    CONSTRAINT fk_agencia FOREIGN KEY (cod_ag) REFERENCES Agencia(cod_ag)
);

CREATE TABLE Produto(
    cod_prod INT NOT NULL AUTO_INCREMENT,
    descricao VARCHAR(60) NOT NULL,
    CONSTRAINT pk_produto PRIMARY KEY(cod_prod)
);

CREATE TABLE Agencia_Produto(
    cod_ag INT NOT NULL,
    cod_prod INT NOT NULL,
    dataAdesao DATE NOT NULL,
    CONSTRAINT pk_agencia_produto PRIMARY KEY(cod_ag, cod_prod),
    CONSTRAINT fk_agencia FOREIGN KEY (cod_ag) REFERENCES Agencia(cod_ag),
    CONSTRAINT fk_produto_agencia FOREIGN KEY (cod_prod) REFERENCES Produto(cod_prod)
)

CREATE TABLE Cliente_Produto(
	cod_cli INT NOT NULL,
    cod_prod INT NOT NULL,
    dataContrato DATE NOT NULL,
    CONSTRAINT pk_cliente_produto PRIMARY KEY(cod_cli, cod_prod),
    CONSTRAINT fk_cliente FOREIGN KEY (cod_cli) REFERENCES Cliente(cod_cli),
    CONSTRAINT fk_produto_cliente FOREIGN KEY (cod_prod) REFERENCES Produto(cod_prod)
);