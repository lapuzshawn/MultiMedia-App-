const router = require('express').Router();

const apiRoutes = require('./api');
router.use('/api', apiRoutes);

const uiRoutes = require('./routes');
router.use('/', uiRoutes);

module.exports = router;
