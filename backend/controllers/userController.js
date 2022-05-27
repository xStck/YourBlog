const bcrypt = require("bcryptjs");
const User = require("../model/User");
const jwt = require("jsonwebtoken");

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

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashedPassword = await bcrypt.hash(password, salt);

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
    );

    if (!validPassword) {
        return res.status(400).json({ message: "Błędny email lub hasło!" });
    }

    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1h"
    });

    res.cookie(String(existingUser._id), token, {
        path: '/',
        maxAge: 3600000,
        httpOnly: true,
        sameSite: 'lax'
    });

    return res.status(200).json({ message: "Zalogowano", loggedUser: existingUser, token });
}

const logOut = async (req, res) => {
    const cookies = req.headers.cookie;
    const token = cookies.split("=")[1];

    if (!token) {
        res.status(404).json({ message: "Nie znaleziono tokena" });
    }

    jwt.verify(String(token), process.env.JWT_SECRET_KEY, (error, user) => {
        if (error) {
            res.statut(400).json({ message: "Zły token" });
        }
        res.clearCookie(`${user.id}`);
        req.cookies[`${user.id}`] = "";
        return res.status(200).json({ message: "Poprawnie się wylogowano" });
    });
}

const checkTokenExpired = async (req, res) => {

    const cookies = req.headers.cookie;

    if (!cookies) {
        return res.status(200).json({ expired: true });
    }

    return res.status(200).json({ expired: false });

}

exports.checkTokenExpired = checkTokenExpired;
exports.logOut = logOut;
exports.signUp = signUp;
exports.logIn = logIn;



