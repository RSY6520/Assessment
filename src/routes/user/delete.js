const userServices = require('../../services/userServices');

async function deleteUser(req, res) {
    try {
            const { id } = req.params;
            const deletedUser = await userServices.deleteUser(id);
            res.status(200).send({
                message: "Ok",
                payload: deletedUser
            })
        }
     catch (e) {
        res.status(400).send({message: e.message});
    }
};

module.exports = deleteUser;