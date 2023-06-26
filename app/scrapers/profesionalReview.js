const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeProfesionalReview() {
    const url = 'https://www.profesionalreview.com/';
    const response = await axios(url);
    const html = response.data;
    const $ = cheerio.load(html);
    const articles = $('li.post-item');

    const scrapedData = [];
    articles.each((index, element) => {
        const link = $(element).find('h2.post-title a');
        const title = link.text();
        const href = link.attr('href');
        const description = $(element).find('p.post-excerpt').text();
        scrapedData.push({ title, description, href });
    });

    return scrapedData;
}

module.exports = scrapeProfesionalReview;