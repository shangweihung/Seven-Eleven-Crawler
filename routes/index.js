var express = require('express');
var router = express.Router();

const GetData = require('../controllers/get_controllers');

getData =new GetData ();

router.get('/', getData.getStores);

router.post('/areas', getData.getAreas);

router.post('/oneareastores', getData.getAreaStores);

module.exports = router;
