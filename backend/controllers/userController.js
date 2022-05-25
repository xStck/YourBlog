const bcrypt = require("bcryptjs");
const User = require("../model/User");
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = "secretKey";

const getUsers = async (req, res) => {
    let users;
    try {
        users = await User.find();
    } catch (error) {
        console.log(error);
    }

    if (!users) {
        return res.status(404).json({ message: "Nie znaleziono żadnych użytkowników." });
    }
    return res.status(200).json({ users });
}

const signUp = async (req, res) => {
    const { userName, email, password } = req.body;

    let existingUser;

    try {
        existingUser = await User.findOne({ email });
    } catch (err) {
        return console.log(err);
    }

    if (existingUser) {
        return res.status(400).json({ message: "Użytkownik o podanym adresie e-mail już istnieje. Zaloguj się." });
    }

    const salt = await bcrypt.genSalt(Number(process.env.SALT))
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const newUser = await User.create({
        userName,
        email,
        password: hashedPassword,
        blogs: [],
    });

    try {
        await newUser.save();
    } catch (error) {
        return console.log(error);
    }

    return res.status(201).json({ newUser });
}

const logIn = async (req, res) => {
    const { email, password } = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({ email });
    } catch (err) {
        return console.log(err);
    }

    if (!existingUser) {
        return res.status(404).json({ message: "Użytkownik o podanym adresie e-mail nie istnieje" });
    }

    const validPassword = await bcrypt.compare(
        password,
        existingUser.password
    )

    if (!validPassword) {
        return res.status(400).json({ message: " Błędny email lub hasło!" })
    }

    const token = jwt.sign({id: existingUser._id}, JWT_SECRET_KEY, {
        expiresIn: "40s"
    })

    res.cookie(String(existingUser._id), token,{
        path: '/',
        maxAge: 40000,
        httpOnly: true,
        sameSite: 'lax'
    })

    return res.status(200).json({ message: "Zalogowano", loggedUser: existingUser, token })
}

const verifyToken = (req, res, next) => {
    const cookies = req.headers.cookie;
    const token = cookies.split("=")[1];
    console.log(token);

    if(!token){
        res.status(404).json({message: "Nie znaleziono tokena"})
    }
    jwt.verify(String(token), JWT_SECRET_KEY, (error, user)=>{
        if(error){
            res.statut(400).json({message:"Zły token"})    
        }
        console.log(user.id)
        req.id = user.id
    })
    next();

}

const getUser = async (req, res, next) => {
    const userId = req.id;
    let user;
    try {
      user = await User.findById(userId, "-password");
    } catch (err) {
      return new Error(err);
    }
    if (!user) {
      return res.status(404).json({ messsage: "User Not FOund" });
    }
    return res.status(200).json({ user });
  };


exports.getUser = getUser;
exports.signUp = signUp;
exports.logIn = logIn;
exports.getUsers = getUsers;
exports.verifyToken = verifyToken;



