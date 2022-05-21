import express from 'express';
import { getUsers, signUp, logIn } from '../controllers/userController';

const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.post("/signup", signUp);
userRouter.post("/login", logIn);

export default userRouter;