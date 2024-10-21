const authenticationService = require('../../services/authenticationService');
const { create } = require('../../utility/auth/jwtToken');

async function post(req, res) {
    try {
            const user = await authenticationService.authenticate(req.body);
            if(user) {
                const details = {
                    id: user.dataValues.id,
                    name: user.dataValues.name,
                    email: user.dataValues.email,
                    roleId: user.dataValues.Role.dataValues.id,
                    roleName: user.dataValues.Role.dataValues.name
                }
                const token = create(details);
                res.set({
                    'Authorization': token
                });
                res.status(200).send({
                    message: "LoggedIn Succesfully!",
                    payload:null
                })
            }
            else throw "User doesn't exist!"
        }
     catch (e) {
        res.status(400).send({message: e.message});
    }
};

module.exports = post;