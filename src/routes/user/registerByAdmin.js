const userServices = require('../../services/userServices');

async function post(req, res) {
    try {
            const user = await userServices.insertByAdmin(req.body)
            res.status(200).send({
                message: "Ok",
                payload: user
            })
        }
     catch (e) {
        res.status(400).send({message: e.message});
    }
};

module.exports = post;