const router = require('express').Router();
const home = require('./homeRoutes');
const login = require('./loginRoutes');
const profile = require('./profileRoutes');
const admin = require('./adminRoutes');
const chat = require('./chatRoute');

router.use('/', home);
router.use('/', login);
router.use('/profile', profile);
router.use('/admin', admin);
router.use('/chat', chat);
module.exports = router;
