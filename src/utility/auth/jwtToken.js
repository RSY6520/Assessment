const jwt = require('jsonwebtoken');

const create = (details) => {
    /* eslint-disable no-undef */
    let token =  jwt.sign({...details}, process.env.SECRET_KEY, { expiresIn: process.env.TOKEN_EXPIRE_IN });// No error will be raised here
    /* eslint-enable no-undef */
    return token;
}

const verify = (token) =>{
    /* eslint-disable no-undef */
    const user = jwt.verify(token,process.env.SECRET_KEY);// No error will be raised here
    /* eslint-enable no-undef */
    return user;
}

module.exports = {create, verify}