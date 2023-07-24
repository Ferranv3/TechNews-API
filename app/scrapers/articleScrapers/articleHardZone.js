const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeArticleHardZone(uri) {
    const response = await axios(uri);
    const html = response.data;
    const $ = cheerio.load(html);
    const content = [];
    const title = $('h1.title').text();
    const p = $('div.excerpt p');
    let img = $('div.featured-image img').attr('src');
    if (img)  {
        img = '<img src="' + img + '" />'
        content.push(img);
    }

    let text = '';

    p.each((index, element) => {
        text = $(element).text();
        content.push(text);
    });

    const p1 = $('div.content span p');

    p1.each((index, element) => {
        text = $(element).text();
        if (text === '') {
            img = null;
            img = $(element).children().attr('src');
            if (img) {
                img = '<img src="' + img + '" />'
                content.push(img);
            }
        } else {
            content.push(text);
        }
    });

    return { title: title, uri: uri, content: content };
}

module.exports = scrapeArticleHardZone;