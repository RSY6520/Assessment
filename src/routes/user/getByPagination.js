const userServices = require('../../services/userServices');

async function get(req, res) {
    try {
            const { pageNo, pageSize, name, email } = req.query;
            const users = await userServices.getUsersByPagination({pageNo, pageSize, name, email});
            res.status(200).send({
                message: "Ok",
                payload: {count: users.length, users}
            })
        }
     catch (e) {
        res.status(400).send({message: e.message});
    }
};

module.exports = get;