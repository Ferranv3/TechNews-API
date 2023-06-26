const scrapeArticleElChapuzas = require('../scrapers/articleScrapers/articleElChapuzas');

async function getArticleBySource(res, id) {
    let data;
    
    const lowerCaseId = id.toLowerCase();

    if (lowerCaseId.includes('elchapuzas')) {
        data = await scrapeArticleElChapuzas(id);
        return res.json(data);
    } else if (lowerCaseId.includes('profesionalreview')) {
        data = await scrapeProfesionalReview();
        return res.json(data);
    } else if (lowerCaseId.includes('hardzone')) {
        data = await scrapeHardZone();
        return res.json(data);
    } else if (lowerCaseId.includes('okay')) {
        return res.json('okay');
    }
}

module.exports = getArticleBySource;
