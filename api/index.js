import express from "express";
import cors from "cors";
import userRouter from "./routes/users.js";

// Criando uma instância do Express e definindo a porta do servidor.

const app = express();
app.use(express.json());
app.use(cors());

app.use("/", userRouter);

app.listen(3006);
