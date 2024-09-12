CREATE TABLE `crud_clinica_medica`.`paciente` (
    `cpf` VARCHAR(11) NOT NULL,
    `nome_paciente` VARCHAR(250) NOT NULL,
    `idade_paciente` INT NOT NULL,
    `dia_marcado` DATE NOT NULL,
    `hora_marcada` VARCHAR(45) NOT NULL,
    PRIMARY KEY (`cpf`),
    UNIQUE INDEX `cpf_UNIQUE` (`cpf` ASC) VISIBLE
);

INSERT INTO
    crud_clinica_medica.paciente (
        cpf,
        nome_paciente,
        idade_paciente,
        dia_marcado,
        hora_marcada
    )
VALUES (
        '12345678901',
        'João',
        25,
        '2021-10-10',
        '10:00'
    );

SELECT * FROM crud_clinica_medica.paciente;

ALTER USER 'root' @'localhost' IDENTIFIED
WITH
    mysql_native_password BY '1234';