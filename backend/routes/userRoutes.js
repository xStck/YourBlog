const express = require("express");
const { signUp, logIn, logOut, checkTokenExpired } = require('../controllers/userController');

const userRouter = express.Router();

userRouter.post("/signup", signUp);
userRouter.post("/login", logIn);
userRouter.post("/logout", logOut);
userRouter.get("/checktokenexpired", checkTokenExpired);
module.exports = userRouter;