const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeArticleProfesionalReview(uri) {
    const response = await axios(uri);
    console.log(uri);
    const html = response.data;
    const $ = cheerio.load(html);
    const title = $('h1.post-title').text();
    const p = $('div.entry-content p');

    const content = [];
    p.each((index, element) => {
        const text = $(element).text();
        content.push(text);
    });

    return { title: title, uri: uri, content: content };
}

module.exports = scrapeArticleProfesionalReview;