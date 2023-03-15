import jwt  from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

export const verifyToken = (req, res, next)=>{
    const token = req.body.token || req.query.token || req.headers["x-access-token"];
    if(!token) return res.status(403).send({message: "Invalid token for authentification"})
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY)
        req.user = decoded;
        return next();
    } catch (error) {
        res.status(401).send({
            success: false,
            message: error.message
        });
    }
}