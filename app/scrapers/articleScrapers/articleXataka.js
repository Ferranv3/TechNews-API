const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeArticleXataka(uri) {
    const response = await axios(uri);
    const html = response.data;
    const $ = cheerio.load(html);
    const content = [];
    const title = $('h1 span').text().trim();
    const p = $('div.article-content div p')
    let img = $('picture img').attr('src');
    if (img)  {
        img = '<img src="' + img + '" />'
        content.push(img);
    }

    let text = '';
    p.each((index, element) => {
        text = $(element).text();
        content.push(text);
    });

    const video = $('div.asset-content div div.js-dailymotion div.dailymotion-player-root div.dailymotion-player-wrapper iframe').html();
    if (video) content.push(video);

    return { title: title, uri: uri, content: content };
}

module.exports = scrapeArticleXataka;