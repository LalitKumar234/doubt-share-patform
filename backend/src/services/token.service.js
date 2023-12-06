const jwt = require("jsonwebtoken");
const { tokenTypes } = require("../config/token");


const generateToken = (userId, expires, type, secret = "jwt-secret") => {
    const payload = {
        sub: userId,
        iat: Math.floor(Date.now() / 1000),
        exp: expires,
        type,
    };
    return jwt.sign(payload, secret);
};

const generateAuthTokens = async (user) => {
    const expires = Math.floor(Date.now() / 1000) + 60 * 60;

    const accessToken = generateToken(user.id, expires, tokenTypes.ACCESS)
    return {
        access: {
            token: accessToken,
            expires: new Date(expires * 1000)
        }
    }
};

const getUserDetailsFromToken = async(token) =>{
    
}


module.exports = {
    generateToken,
    generateAuthTokens,
};