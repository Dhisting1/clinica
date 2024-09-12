import { db } from "../db.js";

//Função getUsers será usado para enviar a resposta de volta ao cliente.
const getUsers = (_, res) => {
  // Esta consulta SQL é usada para selecionar todos os registros da tabela users.
  const query = "SELECT * FROM paciente";

  db.query(query, (error, data) => {
    if (error) return res.json(error);

    return res.status(200).json(data);
  });
};
// Função para adicionar um novo usuário ao banco de dados.
export const addUser = (req, res) => {
  const query =
    "INSERT INTO paciente (`cpf`, `nome_paciente`, `idade_paciente`, `dia_marcado`, `hora_marcada`) VALUES (?)";
  // Valores que serão inseridos no banco de dados.
  const values = [
    req.body.cpf,
    req.body.nome_paciente,
    req.body.idade_paciente,
    req.body.dia_marcado,
    req.body.hora_marcada,
  ];
  // Executa a query e caso de certo retorna uma mensagem de sucesso.
  db.query(query, [values], (error) => {
    if (error) return res.json(error);

    return res.status(201).json({ message: "Paciente adicionado!" });
  });
};
// Função para atualizar um usuário no banco de dados.
export const updateUser = (req, res) => {
  const query =
    "UPDATE paciente SET `cpf` = ?, `nome_paciente` = ?, `idade_paciente` = ?, `dia_marcado` = ?, `hora_marcada` = ? WHERE `cpf` = ?";
  const values = [
    req.params.cpf,
    req.body.nome_paciente,
    req.body.idade_paciente,
    req.body.dia_marcado,
    req.body.hora_marcada,
  ];
  // Executa a query e caso de certo retorna uma mensagem de sucesso.
  db.query(query, [...values, req.params.cpf], (error) => {
    if (error) return res.json(error);

    return res.status(200).json({ message: "Paciente atualizado!" });
  });
};
// Função para deletar um usuário no banco de dados.
export const deleteUser = (req, res) => {
  const query = "DELETE FROM paciente WHERE `cpf` = ?";

  // Deleta o usuário com o cpf informado.
  db.query(query, [req.params.cpf], (error) => {
    if (error) return res.json(error);

    return res.status(200).json({ message: "Paciente apagado!" });
  });
};

export default getUsers;
