import styled from "styled-components";
import axios from "axios";
import PropTypes from "prop-types";
import { FaTrash, FaEdit } from "react-icons/fa";
import { formatDate } from "../utils/cpf";
import { toast } from "react-toastify";

const Table = styled.table`
  width: 100%;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0 0 5px #ccc;
  border-radius: 5px;
  margin: 20px auto;
  word-break: break-all;
`;
const THead = styled.thead``;

const Tr = styled.tr`
  border-bottom: 1px solid #ccc;
`;
const Th = styled.th`
  text-align: start;
  border-bottom: inset;
  padding-bottom: 5px;
`;

const TBody = styled.tbody``;

const Td = styled.td`
  padding-top: 15px;
  text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  width: ${(props) => props.width || "auto"};
`;

const Grid = ({ pacientes, setPacientes, setOnEdit }) => {
  // Função handleEdit que recebe o paciente a ser editado e seta no estado.
  const handleEdit = (item) => {
    setOnEdit(item);
  };

  //  Função handleDelete que recebe o cpf do paciente a ser deletado e faz uma requisição DELETE para a API.
  const handleDelete = async (cpf) => {
    await axios
      .delete(`http://localhost:3006/${cpf}`)
      .then(({ data }) => {
        // Filtra os pacientes que não possuem o cpf deletado e seta no estado.
        const newPacientes = pacientes.filter(
          (paciente) => paciente.cpf !== cpf
        );

        setPacientes(newPacientes);
        // Exibe a mensagem de sucesso
        toast.success(data.message);
      })
      .catch(({ data }) => {
        // Exibe a mensagem de erro
        toast.error(data.message);
      });
    setOnEdit(null);
  };

  return (
    <Table>
      <THead>
        <Tr>
          <Th>CPF</Th>
          <Th>Paciente</Th>
          <Th>Idade</Th>
          <Th>Dia</Th>
          <Th>Hora</Th>
        </Tr>
      </THead>
      <TBody>
        {pacientes.map((item, i) => (
          <Tr key={i}>
            <Td width="20%">{item.cpf}</Td>
            <Td width="20%">{item.nome_paciente}</Td>
            <Td width="20%">{item.idade_paciente}</Td>
            <Td width="20%">{formatDate(item.dia_marcado)}</Td>
            <Td width="20%">{item.hora_marcada}</Td>

            <Td alignCenter width="5%">
              <FaEdit onClick={() => handleEdit(item)} />
            </Td>
            <Td alignCenter width="5%">
              <FaTrash onClick={() => handleDelete(item.cpf)} />
            </Td>
          </Tr>
        ))}
      </TBody>
    </Table>
  );
};
// PropTypes para o componente Grid que recebe os pacientes, setPacientes e setOnEdit. Todos são obrigatórios.
Grid.propTypes = {
  pacientes: PropTypes.array.isRequired,
  setPacientes: PropTypes.func.isRequired,
  setOnEdit: PropTypes.func.isRequired,
};

export default Grid;
