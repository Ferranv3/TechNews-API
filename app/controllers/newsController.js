const scrapeElChapuzas = require('../scrapers/elChapuzas');
const scrapeProfesionalReview = require('../scrapers/profesionalReview');
const scrapeHardZone = require('../scrapers/hardZone');

async function getNewsBySource(res, id) {
    let data;
    switch(id.toLowerCase()) {
        case 'elchapuzas':
            data = await scrapeElChapuzas();
            return res.json(data);
        case 'profesionalreview':
            data = await scrapeProfesionalReview();
            return res.json(data);
        case 'hardzone':
            data = await scrapeHardZone();
            return res.json(data);
        case 'okay':
            return res.json('okay');
    }
}

module.exports = getNewsBySource;
