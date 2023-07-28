const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeXatakaIA() {
    const url = 'https://www.xataka.com/tag/inteligencia-artificial';
    const response = await axios(url);
    const html = response.data;
    const $ = cheerio.load(html);
    const articles = $('article.recent-abstract');

    const scrapedData = [];
    articles.each((index, element) => {
        let href = $(element).find('div.base-asset-image').children().attr('href');
        const title = $(element).find('h2.abstract-title a').text();
        const description = $(element).find('div.abstract-excerpt p').text();
        let img = $(element).find('a picture img').attr('src');
        scrapedData.push({ title, description, href, img });
    });

    return scrapedData;
}

module.exports = scrapeXatakaIA;