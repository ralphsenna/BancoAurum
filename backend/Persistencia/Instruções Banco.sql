------- AGÊNCIAS E USUÁRIOS ADM PARA TESTES -------
INSERT INTO `agencia` (`ag_numero`, `ag_telefone`, `ag_email`, `ag_cep`, `ag_endereco`, `ag_cidade`, `ag_uf`) 
VALUES ('0001', '(18) 3289-1535', 'banco.tarabai@banco.com.br', '19210-000', 'Rua Armando Januário, 351', 'Tarabai', 'SP'),
       ('0002', '(18) 3222-2377', 'prudenbank@prudenbank.com.br', '19013-030', 'Rua Siqueira Campos, 1345, Vila Roberto', 'Presidente Prudente', 'SP')

INSERT INTO `usuario` (`usu_tipo`, `usu_nome`, `usu_cpf`, `usu_rg`, `usu_genero`, `usu_telefone`, `usu_data_nascimento`,
                       `usu_cep`, `usu_endereco`, `usu_cidade`, `usu_uf`, `usu_email`, `usu_senha`, `ag_codigo`) 
VALUES ('Administrador', 'Rafael Silva Damacena', '466.556.268-70', '58.377.857-4', 'Masculino', '(18) 99607-7842', '2002-03-01',
        '19210-000', 'Rua Armando Januário, 351, Centro', 'Tarabai', 'SP', 'fael_damacena@hotmail.com', 'admin', '1'),
       ('Administrador', 'Maurício Sanches Alberti', '370.759.228-66', '45.794.891-7', 'Masculino', '(18) 98195-4446', '1989-03-15',
        '19013-030', 'Rua Siqueira Campos, 1345, Vila Roberto', 'Presidente Prudente', 'SP', 'itoalberti@gmail.com', 'admin', '2')

------- TABELAS -------
CREATE TABLE Agencia(
    ag_codigo INT PRIMARY KEY AUTO_INCREMENT,
    ag_numero INT UNIQUE NOT NULL,
    ag_telefone VARCHAR(15) NOT NULL,
    ag_email VARCHAR(100) NOT NULL,
    ag_cep VARCHAR(9) NOT NULL,
    ag_endereco VARCHAR(100) NOT NULL,
    ag_cidade VARCHAR(50) NOT NULL,
    ag_uf VARCHAR(2) NOT NULL
);
-- No modelo da entidade no Backend, também está relacionado: Lista de Produtos Aderidos (Produtos{})

CREATE TABLE Usuario(
    usu_codigo INT PRIMARY KEY AUTO_INCREMENT,
    usu_tipo VARCHAR(15) NOT NULL CHECK (usu_tipo IN ('Gerente', 'Cliente', 'Funcionário', 'Administrador')),
    usu_nome VARCHAR(100) NOT NULL,
    usu_cpf VARCHAR(14) UNIQUE NOT NULL,
    usu_rg VARCHAR(12) UNIQUE NOT NULL,
    usu_genero VARCHAR(10) NOT NULL CHECK (usu_genero IN ('Masculino', 'Feminino')),
    usu_telefone VARCHAR(15) NOT NULL,
    usu_data_nascimento DATE NOT NULL,
    usu_cep VARCHAR(9) NOT NULL,
    usu_endereco VARCHAR(100) NOT NULL,
    usu_cidade VARCHAR(50) NOT NULL,
    usu_uf VARCHAR(2) NOT NULL,
    usu_email VARCHAR(100) UNIQUE NOT NULL,
    usu_senha VARCHAR(20) NOT NULL,
    ag_codigo INT NOT NULL,
    FOREIGN KEY (ag_codigo) REFERENCES Agencia(ag_codigo)
);
-- No modelo da entidade no Backend, também está relacionado: Lista de Contas e Produtos Contratados (Contas{} e Produtos{})
-- Essa trigger servira para validar se uma agencia já possui um gerente cadastrado
DELIMITER //
CREATE TRIGGER Valida_Gerente_Gravar
BEFORE INSERT ON Usuario
FOR EACH ROW
BEGIN
    DECLARE Gerente_Atual VARCHAR(100);
    DECLARE Mensagem VARCHAR(200);
    SET Gerente_Atual = (SELECT usu_nome FROM Usuario WHERE ag_codigo = NEW.ag_codigo AND usu_tipo = 'Gerente');
    IF NEW.usu_tipo = 'Gerente' AND Gerente_Atual IS NOT NULL THEN
        SET Mensagem = CONCAT('Uma agência só pode ter um usuário gerente.\nGerente atual: ', Gerente_Atual);
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = Mensagem;
    END IF;
END;
// DELIMITER ;
-- O mesmo trigger acima, mas para a alteração
DELIMITER //
CREATE TRIGGER Valida_Gerente_Alterar
BEFORE UPDATE ON Usuario
FOR EACH ROW
BEGIN
    DECLARE Gerente_Atual VARCHAR(100);
    DECLARE Mensagem VARCHAR(200);
    SET Gerente_Atual = (SELECT usu_nome FROM Usuario WHERE ag_codigo = NEW.ag_codigo AND usu_tipo = 'Gerente');
    IF NEW.usu_tipo = 'Gerente' AND Gerente_Atual IS NOT NULL THEN
        SET Mensagem = CONCAT('Uma agência só pode ter um usuário gerente.\nGerente atual: ', Gerente_Atual);
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = Mensagem;
    END IF;
END;
// DELIMITER ;


CREATE TABLE Produto(
    pro_codigo INT PRIMARY KEY AUTO_INCREMENT,
    pro_tipo VARCHAR(18) NOT NULL,
    pro_nome VARCHAR(50) NOT NULL,
    pro_limite DECIMAL(10,2),
    pro_valor DECIMAL(10,2),
    pro_juros INT CHECK (pro_juros BETWEEN 0 AND 100)  -- Em porcentagem
); 
-- No modelo da entidade no Backend, essa tabela servira para preencher as listas de produtos aderidos por uma Agencia e contratados por um Usuario
-- Essa trigger servira para validar os campos de acordo com o tipo de produto
DELIMITER //
CREATE TRIGGER Valida_Tipo_Produto_Gravar
BEFORE INSERT ON Produto
FOR EACH ROW
BEGIN
    IF NEW.pro_tipo = 'Cartão de Débito' THEN
        IF NEW.pro_nome IS NULL THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Cartão de Débito requer pro_nome';
        END IF; 
    ELSEIF NEW.pro_tipo = 'Cartão de Crédito' THEN
        IF NEW.pro_limite IS NULL THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Cartão de Crédito requer pro_limite';
        END IF;
    ELSEIF NEW.pro_tipo = 'Seguro' THEN
        IF NEW.pro_valor IS NULL THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Seguro requer pro_valor';
        END IF;
    ELSEIF NEW.pro_tipo IN ('Empréstimo', 'Financiamento') THEN
        IF NEW.pro_valor IS NULL OR NEW.pro_juros IS NULL THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Empréstimo ou Financiamento requerem pro_valor e pro_juros';
        END IF;
    ELSE
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Tipo de produto inválido. Valores aceitos: Cartão de Débito, Cartão de Crédito, Empréstimo, Financiamento ou Seguro';
    END IF;
END;
// DELIMITER ;
-- O mesmo trigger acima, mas para a alteração
DELIMITER //
CREATE TRIGGER Valida_Tipo_Produto_Alterar
BEFORE UPDATE ON Produto
FOR EACH ROW
BEGIN
    IF NEW.pro_tipo = 'Cartão de Débito' THEN
        IF NEW.pro_nome IS NULL THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Cartão de Débito requer pro_nome';
        END IF; 
    ELSEIF NEW.pro_tipo = 'Cartão de Crédito' THEN
        IF NEW.pro_limite IS NULL THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Cartão de Crédito requer pro_limite';
        END IF;
    ELSEIF NEW.pro_tipo = 'Seguro' THEN
        IF NEW.pro_valor IS NULL THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Seguro requer pro_valor';
        END IF;
    ELSEIF NEW.pro_tipo IN ('Empréstimo', 'Financiamento') THEN
        IF NEW.pro_valor IS NULL OR NEW.pro_juros IS NULL THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Empréstimo ou Financiamento requerem pro_valor e pro_juros';
        END IF;
    ELSE
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Tipo de produto inválido. Valores aceitos: Cartão de Débito, Cartão de Crédito, Empréstimo, Financiamento ou Seguro';
    END IF;
END;
// DELIMITER ;


CREATE TABLE Agencia_Produto(
    ag_codigo INT NOT NULL,
    pro_codigo INT NOT NULL,
    ap_data_adesao DATE NOT NULL,
    PRIMARY KEY (ag_codigo, pro_codigo),
    FOREIGN KEY (ag_codigo) REFERENCES Agencia(ag_codigo),
    FOREIGN KEY (pro_codigo) REFERENCES Produto(pro_codigo)
);
-- No modelo da entidade no Backend, essa tabela servira para preencher as listas de produtos aderidos por uma Agencia

CREATE TABLE Usuario_Produto(
	usu_codigo INT NOT NULL,
    pro_codigo INT NOT NULL,
    up_data_contratacao DATE NOT NULL,
    up_saldo DECIMAL(10,2),
    up_valor_final DECIMAL(10,2),
    PRIMARY KEY (usu_codigo, pro_codigo),
    FOREIGN KEY (usu_codigo) REFERENCES Usuario(usu_codigo),
    FOREIGN KEY (pro_codigo) REFERENCES Produto(pro_codigo)
); 
-- No modelo da entidade no Backend, essa tabela servira para preencher as listas de produtos contratados por um Usuario


------- ADICIONAR DEPOIS -------
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
CREATE TABLE Conta(
    con_codigo INT PRIMARY KEY AUTO_INCREMENT,
    con_tipo VARCHAR(10) NOT NULL CHECK (con_tipo IN ('Corrente', 'Poupanca')),
    con_numero INT UNIQUE NOT NULL,
    con_saldo DECIMAL(10,2) NOT NULL,
    con_limite DECIMAL(10,2) NOT NULL,
    usu_codigo INT NOT NULL,
    ag_codigo INT NOT NULL,
    FOREIGN KEY (usu_codigo) REFERENCES Usuario(usu_codigo),
    FOREIGN KEY (ag_codigo) REFERENCES Usuario(ag_codigo)
);
-- No modelo da entidade no Backend, também está relacionado: Lista de Transações (Transacoes{})

CREATE TABLE Transacao(
    tra_codigo INT PRIMARY KEY AUTO_INCREMENT,
    tra_tipo VARCHAR(15) NOT NULL CHECK (tra_tipo IN ('Pix', 'Deposito', 'Saque', 'Compra Crédito', 'Compra Débito', 'Fatura')),
    tra_origem INT,
    tra_destino INT,
    tra_data TIMESTAMP NOT NULL,
    tra_valor DECIMAL(10,2) NOT NULL,
    tra_observacao VARCHAR(100),
    pro_codigo INT,
    FOREIGN KEY (tra_origem) REFERENCES Conta(con_codigo),
    FOREIGN KEY (tra_destino) REFERENCES Conta(con_codigo),
    FOREIGN KEY (pro_codigo) REFERENCES Produto(pro_codigo),
    /* CHECK (
        (tra_tipo = 'Pix' AND tra_origem IS NOT NULL AND tra_destino IS NOT NULL) OR
        (tra_tipo = 'Deposito' AND tra_destino IS NOT NULL) OR
        (tra_tipo IN ('Saque', 'Compra Débito') AND tra_origem IS NOT NULL) OR
        (tra_tipo IN ('Compra Crédito', 'Fatura') AND tra_origem IS NOT NULL AND pro_codigo IS NOT NULL) ****(VALIDAR SE É DO TIPO CARTAO DE CREDITO)****
    ),
    CHECK (tra_origem IS NULL OR tra_destino IS NULL OR tra_origem != tra_destino) */
);
-- No modelo da entidade no Backend, essa tabela servira para preencher a lista de transações de uma conta
