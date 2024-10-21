const bcrypt = require('bcrypt');

const comareHashedPassword = async (password,hashedPassword) =>{
let result = await bcrypt.compare(password,hashedPassword)
    return result;
}

module.exports = comareHashedPassword;
