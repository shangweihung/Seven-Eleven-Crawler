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
            
            $('POIID').each(function (index, element) {
　　　　　　     //Eliminate Space
                storeID.push($(this).text().replace(/\s/g, ''));
                storeValues = index; 
            })
            
            $('POIName').each(function (index, element) {
                storeName.push($(this).text());
            })
            
            $('Telno').each(function (index, element) {
                //Eliminate Space
                storeTelephone.push($(this).text().replace(/\s/g, ''));
            })
            
            $('FaxNo').each(function (index, element) {
                //Eliminate Space
                storeFax.push($(this).text().replace(/\s/g, '')); 
            })
            
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