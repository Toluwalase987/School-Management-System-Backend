const jwt = require("jsonwebtoken");

const generateToken = (id) => {
    return jwt.sign({id}, 'key', {expiresIn: '2d'})
};


module.exports = generateToken;
