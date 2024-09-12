import { toast, ToastContainer } from "react-toastify";
import GlobalStyle from "./styles/global";
import Form from "./components/Form";
import Grid from "./components/Grid";
import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

const Container = styled.div`
  width: 100%;
  margin: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h2`
  font-size: 2rem;
  color: #333;
  margin-bottom: 10px;
`;
function App() {
  const [pacientes, setPacientes] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  // Busca os pacientes ao carregar a página
  const getPacientes = async () => {
    try {
      const res = await axios.get("http://localhost:3006/");
      // Ordena os pacientes por nome antes de setar no estado
      setPacientes(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    } catch (err) {
      toast.error("Erro ao buscar os pacientes", err);
    }
  };

  useEffect(() => {
    getPacientes();
  }, [setPacientes]);

  return (
    <>
      <Container>
        <Title>Clínica CRUD</Title>
        <Form
          onEdit={onEdit}
          setOnEdit={setOnEdit}
          getPacientes={getPacientes}
        />
        <Grid
          pacientes={pacientes}
          setPacientes={setPacientes}
          setOnEdit={setOnEdit}
        />
      </Container>
      <ToastContainer autoClose={3000} position="bottom-left" />
      <GlobalStyle />
    </>
  );
}

export default App;
