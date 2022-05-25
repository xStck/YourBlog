const express = require("express")
const { getUsers, getUser ,signUp, logIn, verifyToken } = require('../controllers/userController');

const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.post("/signup", signUp);
userRouter.post("/login", logIn);
userRouter.get("/user", verifyToken, getUser);
module.exports = userRouter;