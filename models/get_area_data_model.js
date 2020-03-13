const request = require('request');
const cheerio = require('cheerio');

const getTownName = (url, cityID) => {
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

module.exports = getTownName;