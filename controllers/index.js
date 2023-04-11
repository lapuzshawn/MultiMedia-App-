const router = require('express').Router();
const apiRoutes = require('./api');

const uiRoutes = require('./routes');
router.use('/', uiRoutes);

module.exports = router;
