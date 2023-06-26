const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeHardZone() {
    const url = 'https://hardzone.es/';
    const response = await axios(url);
    const html = response.data;
    const $ = cheerio.load(html);
    const articles = $('article.news-item');

    const scrapedData = [];
    articles.each((index, element) => {
        const link = $(element).find('a.rocket-lazyload');
        const title = $(element).find('h2.title a').text();
        const description = $(element).find('div.excerpt p').text();
        const href = link.attr('href');
        scrapedData.push({ title, description, href });
    });

    return scrapedData;
}

module.exports = scrapeHardZone;