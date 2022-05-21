import express from 'express';
import { getUsers, signUp, logIn } from '../controllers/userController';

const router = express.Router();

router.get("/", getUsers);
router.post("/signup", signUp);
router.post("/login", logIn);

export default router;