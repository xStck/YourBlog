const express = require("express")
const { getUsers ,signUp, logIn, logOut, checkTokenExpired } = require('../controllers/userController');
const { verifyToken } = require('../middleware/verifyToken');

const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.post("/signup", signUp);
userRouter.post("/login", logIn);
userRouter.post("/logout", logOut);
userRouter.get("/checktokenexpired", checkTokenExpired);
module.exports = userRouter;