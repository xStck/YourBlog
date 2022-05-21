import User from '../model/User';
import bcrypt from 'bcryptjs';

export const getUsers = async (req, res, next) => {
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

export const signUp = async (req, res, next) => {
    const { userName, email, password } = req.body;

    let checkUser;

    try {
        checkUser = await User.findOne({ email });
    } catch (err) {
        return console.log(err);
    }

    if (checkUser) {
        return res.status(404).json({ message: "Użytkownik o podanym adresie e-mail już istnieje. Zaloguj się." });
    }

    const salt = await bcrypt.genSalt(Number(process.env.SALT))
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const newUser = new User({
        userName,
        password: hashedPassword,
        blogs:[],
        email
    });

    try {
        await newUser.save();
    } catch (error) {
        return console.log(error);
    }

    return res.status(201).json({ newUser });
}

export const logIn = async (req, res, next) => {
    const { email, password } = req.body;

    let user;

    try {
        user = await User.findOne({ email });
    } catch (err) {
        return console.log(err);
    }

    if (!user) {
        return res.status(404).json({ message: "Użytkownik o podanym adresie e-mail nie istnieje" });
    }

    const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
    )

    if (!validPassword) {
        return res.status(401).json({ message: " Błędny email lub hasło!" })
    }

    return res.status(200).json({ message: "Zalogowano" })

}