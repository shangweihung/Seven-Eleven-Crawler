const request = require('request');
const cheerio = require('cheerio');

const getStoreInfo = (url, cityName, townName) => {
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

module.exports = getStoreInfo;