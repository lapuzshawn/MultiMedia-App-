const router = require('express').Router();

const messageRoute = require('./messageRoutes');
const userRoutes = require('./userRoutes');
router.use('/user', userRoutes);
router.use('/messages', messageRoute);
module.exports = router;
