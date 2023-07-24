const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeArticleElChapuzas(uri) {
    const response = await axios(uri);
    console.log(uri);
    const html = response.data;
    const $ = cheerio.load(html);
    const title = $('h1.post-title').text();
    const p = $('div.post-content p');
    let text;
    const content = [];

    p.each((index, element) => {
        text = $(element).text();
        content.push(text);
    });

    return { title: title, uri: uri, content: content };
}

module.exports = scrapeArticleElChapuzas;