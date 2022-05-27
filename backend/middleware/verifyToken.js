const jwt = require("jsonwebtoken");
const { logOut } = require('../controllers/userController');

const verifyToken = (req, res, next) => {
    const cookies = req.headers.cookie;
    const token = cookies.split("=")[1];
    if(!token){
        res.status(404).json({message: "Nie znaleziono tokena"})
    }
    jwt.verify(String(token), process.env.JWT_SECRET_KEY, (error, user)=>{
        if(error){
            res.statut(400).json({message:"Zły token"})    
        }
        req.id = user.id
    })
    next();
}
exports.verifyToken = verifyToken;
