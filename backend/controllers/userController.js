import bcrypt from 'bcryptjs';
import User from '../model/User';
import jwt from "jsonwebtoken";

export const getUsers = async (req, res) => {
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

export const signUp = async (req, res) => {
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
        blogs:[],
    });

    try {
        await newUser.save();
    } catch (error) {
        return console.log(error);
    }

    return res.status(201).json({ newUser });
}

export const logIn = async (req, res) => {
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

    return res.status(200).json({ message: "Zalogowano", loggedUser: existingUser})

}


