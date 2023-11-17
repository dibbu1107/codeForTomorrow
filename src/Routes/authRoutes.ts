import express from "express";
import { login } from '../Controller/authController';
import { authMiddleware } from "../Middleware/authMiddleware";

const router = express.Router();

router.post('/login',login);

export default router;