const userServices = require('../../services/userServices');

async function post(req, res) {
    try {
        const registeredUser = await userServices.insert(req.body);
        res.status(200).send({
            message: "Ok",
            payload: registeredUser
        });
    } catch (e) {
        res.status(400).send({message: e.message});
    }
};

module.exports = post;