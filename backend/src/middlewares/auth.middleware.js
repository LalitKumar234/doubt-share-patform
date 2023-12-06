const httpStatus = require("http-status");
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    const token = String(req.headers.authorization)
        .replace(/^bearer|^jwt/i, "")
        .replace(/^\s+|\s+$/gi, "");

        // console.log(token)

    //   if (!token) return res.status(401).json({ message: "Auth Error" });
    if (!token) return res.status(httpStatus.UNAUTHORIZED).json({ message: "Please login to the portal" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_STRING);
        // console.log('Decoded User Details:', decoded);
        req.userId = decoded.sub;
        // console.log(req.user)
        next();
    } catch (err) {
        console.log(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: "Invalid Token"  });
    }
};
module.exports = auth;