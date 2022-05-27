const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    try {
        const cookies = req.headers.cookie;
        const token = cookies.split("=")[1];
        if (!token) {
            return res.status(404).json({ message: "Nie znaleziono tokena." });
        }
        jwt.verify(String(token), process.env.JWT_SECRET_KEY, (error, user) => {
            if (error) {
                return res.statut(400).json({ message: "Nie masz dostępu do tej funkcji." });
            }
            req.id = user.id;
        })
        next();
    } catch (error) {
        return res.status(404).json({ message: "Nie masz dostępu do tej funkcji." })
    }
}

exports.verifyToken = verifyToken;
