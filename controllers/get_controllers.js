const loadData = require('../models/get_data_model');
const getAreaData = require('../models/get_area_data_model');
const getAreaStoreData = require('../models/get_area_store_model');

module.exports = class getData{
    async getStores(req, res, next) {
        try{
            const url = "http://emap.pcsc.com.tw/EMapSDK.aspx";
            const result = await loadData(url);
            res.json({
                result: result
            })
        } catch(e) {
            console.log(e);
        }
    }

    async getAreas(req, res, next) {
        try {
            const result = await getAreaData("http://emap.pcsc.com.tw/EMapSDK.aspx", req.body.cityid);
            res.json({
                result: result
            })
        } catch (e) {
            console.log(e);
        }
    }

    async getAreaStores(req, res, next){
        try {
            console.log(req.body.city);
            const result = await getAreaStoreData("http://emap.pcsc.com.tw/EMapSDK.aspx", req.body.city, req.body.town);
            console.log("length " + result.length);
            res.json({
                result: result
            })
        } catch(e) {
            console.log(e);
        }
    }
}