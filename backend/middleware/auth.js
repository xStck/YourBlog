import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
    try {
        let token = req.headers["x-access-token"];
        let decodedData;

        if(token){
            decodedData = jwt.verify(token, "secretToken")
            req.userId = decodedData?.id;
        }else{
            console.log("NIE DZIAŁA")
        }

        next();
    } catch (error) {
        console.log(error)
    }
}

export default auth;