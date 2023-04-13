const router = require('express').Router();
const home = require('./homeRoutes');
const login = require('./loginRoutes');
const profile = require('./profileRoutes');
const admin = require('./adminRoutes');
const chat = require('./chatRoute');
const bio = require('./bioRoutes');

router.use('/', home);
router.use('/', login);
router.use('/profile', profile);
router.use('/admin', admin);
router.use('/chat', chat);
router.use('/bio', bio);

module.exports = router;
