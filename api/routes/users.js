import express from "express";
import getUsers from "../controllers/user.js";
import { addUser, updateUser, deleteUser } from "../controllers/user.js";
// Rota para obter todos os usuários.

const router = express.Router();
router.get("/", getUsers);
router.post("/", addUser);
router.put("/:cpf", updateUser);
router.delete("/:cpf", deleteUser);

export default router;
