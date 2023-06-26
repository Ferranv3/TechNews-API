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
        let href = $(element).find('a.rectangle-link').attr('href');
        const title = $(element).find('h2.title a').text();
        const description = $(element).find('div.excerpt p').text();
        if (!href) href = $(element).find('h2.title a').attr('href');
        let img = $(element).find('a.rectangle-link img').attr('src');
        if (!img) img = $(element).find('a img').attr('src');
        scrapedData.push({ title, description, href, img });
    });

    return scrapedData;
}

module.exports = scrapeHardZone;