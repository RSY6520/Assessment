const bcrypt = require('bcrypt');

const getHashedPassword = (password) =>{
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(password, salt);
}

module.exports = getHashedPassword;