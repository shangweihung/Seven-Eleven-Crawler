const getAreaData = require('../models/get_area_data_model');
const getAreaStoreData = require('../models/get_area_store_model');

module.exports = class getData{

    async getAreas(req, res, next) {
        try {
            //console.log(typeof req.body.city);
            const result = await getAreaData("http://emap.pcsc.com.tw/EMapSDK.aspx", req.body.cityName);
            res.render('area',
            {
                title: req.body.cityName,
                result: result
            })
        } catch (e) {
            console.log(e);
        }
    }

    async getAreaStores(req, res, next){
        try {
            
            const result = await getAreaStoreData("http://emap.pcsc.com.tw/EMapSDK.aspx", req.body.cityName, req.body.townName);
            //console.log("length " + result.length);
            res.render('store',
            {
                title:  req.body.cityName + ' - ' + req.body.townName,
                result: result
            })
        } catch(e) {
            console.log(e);
        }
    }
}