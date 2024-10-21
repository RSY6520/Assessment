
const authorize = (roles = []) => {
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return (req, res, next) => {
            if (roles.length && !roles.includes(req.user.roleName)) {
                // user's role is not authorized
                return res.status(401).json({ message: 'Unauthorized' });
            }

            //authorization successful
            next();
        }
}
module.exports = authorize;