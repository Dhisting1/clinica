import { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { removeText, validateCPF } from "../utils/cpf";
import axios from "axios";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

const FormContainer = styled.form`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0 0 5px #ccc;
  border-radius: 5px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
`;
const Input = styled.input`
  width: 100%;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 35px;
`;
const Label = styled.label`
  font-size: 1.2rem;
  color: #333;
`;
const Button = styled.button`
  padding: 10px 10px;
  border: none;
  border-radius: 5px;
  background-color: #098df3;
  color: #fff;
  font-size: 1.1rem;
  cursor: pointer;
`;

const Form = ({ getPacientes, onEdit, setOnEdit }) => {
  const ref = useRef(); // Hook useRef para referenciar o formulário.
  const [$cpf, $setCpf] = useState(""); // Hook useState para controlar o valor do campo cpf.
  const [error, setError] = useState(""); // Hook useState para controlar a mensagem de erro do campo cpf.
  // Hook useEffect que monitora a propriedade onEdit e preenche os campos do formulário com os dados do paciente a ser editado.
  useEffect(() => {
    const user = ref.current;

    user.cpf.value = onEdit?.cpf || "";
    user.nome_paciente.value = onEdit?.nome_paciente || "";
    user.idade_paciente.value = onEdit?.idade_paciente || "";
    user.dia_marcado.value = onEdit?.dia_marcado || "";
    user.hora_marcada.value = onEdit?.hora_marcada || "";
  }, [onEdit]);
  // Função handleSubmit que recebe o evento do formulário e faz uma requisição POST para a API com os dados do paciente.
  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = ref.current;
    // Condicional que verifica se os campos do formulário estão preenchidos, caso não estejam, exibe um alerta para o usuário preencher todos os campos.
    if (
      !user.nome_paciente.value ||
      !user.cpf.value ||
      !user.idade_paciente.value ||
      !user.dia_marcado.value ||
      !user.hora_marcada.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }
    // Condicional que verifica se a propriedade onEdit está setada, se estiver, faz uma requisição PUT para a API com os dados do paciente a ser editado.
    if (onEdit) {
      await axios
        .put("http://localhost:3006/" + onEdit.cpf, {
          cpf: user.cpf.value,
          nome_paciente: user.nome_paciente.value,
          idade_paciente: user.idade_paciente.value,
          dia_marcado: user.dia_marcado.value,
          hora_marcada: user.hora_marcada.value,
        })
        .then(({ data }) => {
          toast.success(data.message);
        })
        .catch(({ data }) => {
          toast.error(data.message);
        });
    } else {
      await axios
        .post("http://localhost:3006/", {
          cpf: user.cpf.value,
          nome_paciente: user.nome_paciente.value,
          idade_paciente: user.idade_paciente.value,
          dia_marcado: user.dia_marcado.value,
          hora_marcada: user.hora_marcada.value,
        })
        .then(({ data }) => {
          toast.success(data.message);
        })
        .catch(({ data }) => {
          toast.error(data.message);
        });
      // Após o envio do formulário, limpa os campos do formulário para que o usuário possa inserir novos dados.
      user.cpf.value = "";
      user.nome_paciente.value = "";
      user.idade_paciente.value = "";
      user.dia_marcado.value = "";
      user.hora_marcada.value = "";

      setOnEdit(null);
      getPacientes();
    }
  };
  const handleCpfChange = (event) => {
    const value = event.target.value;
    const remove = removeText(value);
    $setCpf(remove);

    if (validateCPF(remove)) {
      setError("");
    } else {
      setError("CPF inválido");
    }
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label htmlFor="nome_paciente">Nome: </Label>
        <Input type="text" name="nome_paciente" id="nome_paciente" />
      </InputArea>

      <InputArea>
        <Label htmlFor="cpf">CPF: </Label>
        <Input
          type="text"
          name="cpf"
          id="cpf"
          maxLength={11}
          value={$cpf}
          onChange={handleCpfChange}
        />
        {error && <span style={{ color: "red" }}>{error}</span>}
      </InputArea>

      <InputArea>
        <Label htmlFor="idade_paciente">Idade: </Label>
        <Input type="number" name="idade_paciente" id="idade_paciente" />
      </InputArea>

      <InputArea>
        <Label htmlFor="dia_marcado">Dia da consulta: </Label>
        <Input type="date" name="dia_marcado" id="dia_marcado" />
      </InputArea>

      <InputArea>
        <Label htmlFor="hora_marcada">Hora da consulta:</Label>
        <Input type="time" name="hora_marcada" id="hora_marcada" />
      </InputArea>

      <Button type="submit">Enviar</Button>
    </FormContainer>
  );
};
// PropTypes para o componente Form que recebe as props getPacientes, onEdit e setOnEdit e valida se são obrigatórias.
Form.propTypes = {
  getPacientes: PropTypes.func.isRequired,
  onEdit: PropTypes.shape({
    cpf: PropTypes.string,
    nome_paciente: PropTypes.string,
    idade_paciente: PropTypes.number,
    dia_marcado: PropTypes.string,
    hora_marcada: PropTypes.string,
  }),
  setOnEdit: PropTypes.func.isRequired,
};

export default Form;
