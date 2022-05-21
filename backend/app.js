import express from 'express';

const app = express()
const PORT = process.env.PORT || 3000

app.use("/api", (req, res, next) =>{
    res.send("Hello World")
})

app.listen(PORT, () => console.log(`Server działa na porcie: ${PORT}`))
