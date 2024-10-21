const userServices = require('../../services/userServices');

async function get(req, res) {
    try {
            const { email } = req.user;
            const profile = await userServices.getProfile({email});
            res.status(200).send({
                message: "Ok",
                payload: profile
            })
        }
     catch (e) {
        res.status(400).send({message: e.message});
    }
};

module.exports = get;