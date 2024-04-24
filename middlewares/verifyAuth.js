const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if(!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        const decode = jwt.verify(token, process.env.SECRET_KEY);
        req.currentUserId = decode.userID;
        console.log(decode)
        next();
    } catch (error) {
        res.status(500).json({ message: "Error verifying token"});
    }
    

}

module.exports = verifyToken;