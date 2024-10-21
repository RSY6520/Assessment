const userServices = require('../../services/userServices');

async function put(req, res) {
    try {
            const { id } = req.params;
            const updatedUser = await userServices.update(id, req.body);
            res.status(200).send({
                message: "Ok",
                payload: updatedUser
            })
        }
     catch (e) {
        res.status(400).send({message: e.message});
    }
};

module.exports = put;