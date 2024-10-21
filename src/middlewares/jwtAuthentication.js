const { verify } = require("../utility/auth/jwtToken");

const jwtAuthentication = async (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    try {
        const user = verify(token);
        req.user = user;
        next();
    }
    catch (err) {
        res.status(401).send({
            message: `authentication failed: ${err.message}` 
        })
    }
};

module.exports = jwtAuthentication;