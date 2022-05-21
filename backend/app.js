import express from 'express';
import mongoose from 'mongoose'
import router from './routes/userRoutes';
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json());
app.use("/api/user",router);

mongoose.connect(
    'mongodb+srv://student:student@yourblog.lv2og.mongodb.net/?retryWrites=true&w=majority'
).then(() => app.listen(PORT))
    .then(() => console.log(`Połączono z bazą danych. Server działa na porcie: ${PORT}`))
    .catch((error) => console.log(error))




