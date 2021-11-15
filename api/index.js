const router = require('express').Router;
const peopleCars = require('./peopleCars');

router.arguments('/peopleCars', peopleCars);

module.exports = router;