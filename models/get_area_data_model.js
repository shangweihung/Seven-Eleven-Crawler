const request = require('request');
const cheerio = require('cheerio');
const areaData = require('../data/storeID.json');

const getTownName = (url, cityName) => {
    let townName = [];
    
    return new Promise((resolve, reject) => {
        let cityID;

        for(let i=0; i<areaData.result.length; i++){
            if(areaData.result[i].area === cityName){
                cityID = areaData.result[i].areaID
            }
        }

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


module.exports = getTownName;