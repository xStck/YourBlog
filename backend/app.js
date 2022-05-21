import express from 'express';
import mongoose from 'mongoose'
import userRouter from './routes/userRoutes';
import blogRouter from './routes/blogRoutes';

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/blog", blogRouter);


mongoose.connect(
    'mongodb+srv://student:student@yourblog.lv2og.mongodb.net/?retryWrites=true&w=majority'
).then(() => app.listen(PORT))
    .then(() => console.log(`Połączono z bazą danych. Server działa na porcie: ${PORT}`))
    .catch((error) => console.log(error))