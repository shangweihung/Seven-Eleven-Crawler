const loadData = require('../models/get_data_model');
const getAreaData = require('../models/get_area_data_model');
const getAreaStoreData = require('../models/get_area_store_model');

module.exports = class getData{
    async getStores(req, res, next) {
        const url = "http://emap.pcsc.com.tw/EMapSDK.aspx";
        const result = await loadData(url);
        res.json({
            result: result
        })
    }

    async getAreas(req, res, next) {
        const result = await getAreaData("http://emap.pcsc.com.tw/EMapSDK.aspx", "01");
        res.json({
            result: result
        })
    }

    async getAreaStores(req, res, next){
        const result = await getAreaStoreData("http://emap.pcsc.com.tw/EMapSDK.aspx", "台北市", "松山區");
        console.log("length " + result.length);
        res.json({
            result: result
        })
    }
}