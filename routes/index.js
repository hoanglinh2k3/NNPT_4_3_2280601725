var express = require('express');
var router = express.Router();

const userRoutes = require('./users');
const roleRoutes = require('./roles');

router.use('/users', userRoutes);
router.use('/roles', roleRoutes);

module.exports = router;