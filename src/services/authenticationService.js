const { User, Role } = require("../db");
const comareHashedPassword = require("../utility/auth/compareHashedPassword");
const throwError = require("../utility/gloabal/throwError");

async function authenticate(data) {
    const isExist = await User.findOne({
        attributes: ['id', 'name', 'email', 'password'],
        include:[{
                model:Role,
                attributes:['id', 'name']
            }
            ],
        where: {
            email: data.email
        }
    });
    let result;
    if(isExist){ 
        result = await comareHashedPassword(data.password, isExist.dataValues.password);
    }

    if(!result || !result) throwError("email or password is incorrect!");
    return isExist;
}

module.exports = { authenticate };