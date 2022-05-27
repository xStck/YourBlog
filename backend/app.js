const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/userRoutes");
const blogRouter = require("./routes/blogRoutes");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();
app.use(cors({credentials: true, origin: "http://localhost:3000"}));
app.use(cookieParser());
const PORT = process.env.PORT || 8080;
app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/blog", blogRouter);


mongoose.connect(
    `mongodb+srv://student:${process.env.MONGODB_PASSWORD}@yourblog.lv2og.mongodb.net/?retryWrites=true&w=majority`
).then(() => app.listen(PORT))
    .then(() => console.log(`Połączono z bazą danych. Server działa na porcie: ${PORT}`))
    .catch((error) => console.log(error));