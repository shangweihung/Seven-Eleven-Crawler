var express = require('express');
var router = express.Router();

const GetData = require('../controllers/get_controllers');

getData =new GetData ();

router.get('/', (req,res,next)=> {
    res.render('index');
});

router.post('/areas', getData.getAreas);

router.post('/stores', getData.getAreaStores);

module.exports = router;
