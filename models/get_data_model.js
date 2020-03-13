const request = require('request');
const cheerio = require('cheerio');
const areaIDName = require('../data/storeID.json');


const crawlerData = async (url) => {
    const loadData = new getData();

    let areaData = [];
    for (let i=0 ; i< areaIDName.result.length; i++){
        const cityID = areaIDName.result[i].areaID;
        const cityName = areaIDName.result[i].area;
        const townName = await loadData.getTownName(url, cityID);
        if(townName.length !==0){
            areaData.push({
                cityName: cityName,
                townName: townName
            });
        }
    }

    let totalStoreData = [];
    for (let i=0; i<areaData.length; i++){
        for (let j=0; j<areaData[i].townName.length; j++){
            let city = areaData[i].cityName;
            let town = areaData[i].townName[j];
            const storeInfo = await loadData.getStoreInfo(url, city, town);
            if (storeInfo[0].storeID != undefined){
                totalStoreData.push({
                    city: city,
                    town: town,
                    storeDatas: storeInfo
                })
            }
        }
    }

    return totalStoreData;
}

module.exports = crawlerData;


class getData{
    // Get all town of the city
    getTownName(url, cityID){
        let townName = [];

        return new Promise((resolve, reject) => {
            request.post({
                url: url,
                form: {
                    commandid: "GetTown",
                    cityId: cityID
                }
            }, function (err, res, body) {
                const $ = cheerio.load(body);
                $('TownName').each(function (index, element){
                    townName.push($(this).text());
                })

                resolve(townName);
            })
        })
    }

    // Get all store info in the town of the city
    getStoreInfo(url, cityName, townName){
        let store = [];
        let storeID = [];
        let storeName = [];
        let storeTelephone = [];
        let storeFax = []
        let storeAddress = [];
        let storeValues = "";

        return new Promise((resolve, reject) => {
            request.post({
                url: url,
                form: {
                    commandid: "SearchStore",
                    city: cityName,
                    town: townName
                }
            }, function (err, res, body) {
                const $ = cheerio.load(body);
                // 店家ID
                $('POIID').each(function (index, element) {
    　　　　　　     //去空白
                    storeID.push($(this).text().replace(/\s/g, ''));
                    storeValues = index; // 該區所有店家的個數
                })
                // 店家名稱
                $('POIName').each(function (index, element) {
                    storeName.push($(this).text());
                })
                // 店家電話
                $('Telno').each(function (index, element) {
                    //去空白
                    storeTelephone.push($(this).text().replace(/\s/g, ''));
                })
                // 店家傳真
                $('FaxNo').each(function (index, element) {
                    //去空白
                    storeFax.push($(this).text().replace(/\s/g, '')); 
                })
                // 店家地址
                $('Address').each(function (index, element) {
                    storeAddress.push($(this).text());
                })

                for (let i = 0; i <= storeValues; i++) {
                    store.push({
                        storeCity: cityName,
                        storeTown: townName,
                        storeID: storeID[i],
                        storeName: storeName[i],
                        storeTele: storeTelephone[i],
                        storeFax: storeFax[i],
                        storeAddress: storeAddress[i]
                    });
                }
                resolve(store);
            })
        })
    }
}

