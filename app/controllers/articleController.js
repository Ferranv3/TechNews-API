const scrapeArticleElChapuzas = require('../scrapers/articleScrapers/articleElChapuzas');
const scrapeArticleProfesionalReview = require('../scrapers/articleScrapers/articleProfesionalReview');
const scrapeArticleHardZone = require('../scrapers/articleScrapers/articleHardZone');
const scrapeArticleXataka = require('../scrapers/articleScrapers/articleXataka');

async function getArticleBySource(res, id) {
    let data;
    const lowerCaseId = id.toLowerCase();

    if (lowerCaseId.includes('elchapuzas')) {
        data = await scrapeArticleElChapuzas(id);
        return res.json(data);
    } else if (lowerCaseId.includes('profesionalreview')) {
        data = await scrapeArticleProfesionalReview(id);
        return res.json(data);
    } else if (lowerCaseId.includes('hardzone')) {
        data = await scrapeArticleHardZone(id);
        return res.json(data);
    } else if (lowerCaseId.includes('xataka')) {
        data = await scrapeArticleXataka(id);
        return res.json(data);
    } else if (lowerCaseId.includes('okay')) {
        return res.json('okay');
    }
}

module.exports = getArticleBySource;
