const roles = require('../enum/role');
const authorize = require('../middlewares/authorize');
const jwtAuthentication = require('../middlewares/jwtAuthentication');

var router = require('express').Router();


router.post('/login', require('./user/login'));
router.post('/register', require('./user/register'));
router.use(jwtAuthentication);
router.get('/profile', require('./user/getProfile'));
router.post('/admin/users/register', authorize([roles.admin]), require('./user/registerByAdmin'));
router.get('/admin/users/getByPagination', authorize([roles.admin]), require('./user/getByPagination'));
router.put('/admin/users/update/:id', authorize([roles.admin]), require('./user/update'));
router.delete('/admin/users/delete/:id', authorize([roles.admin]), require('./user/delete'));


module.exports = router;