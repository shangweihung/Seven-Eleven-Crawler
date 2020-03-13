var express = require('express');
var router = express.Router();

const GetData = require('../controllers/get_controllers');

getData =new GetData ();

router.get('/', getData.getStores);

router.get('/areas', getData.getAreas);

router.get('/oneareastores', getData.getAreaStores);

module.exports = router;
