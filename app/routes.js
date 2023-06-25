const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeElChapuzas() {
    const url = 'https://elchapuzasinformatico.com/';
    const source = 'elchapuzas';
    const response = await axios(url);
    const html = response.data;
    const $ = cheerio.load(html);
    const articles = $('article.blog-item');

    const scrapedData = [];
    articles.each((index, element) => {
        const link = $(element).find('a.rocket-lazyload');
        const title = $(element).find('h2.entry-title a').text();
        const description = $(element).find('p.post-excerpt').text();
        const href = link.attr('href');
        //const img = $(element).find('a.rocket-lazyload img').attr('src');
        //const style = 'background-image: url("https://elchapuzasinformatico.com/wp-content/uploads/2023/06/OceanGate-Titan-controlado-por-Logitech-F710-378x150.jpg")';
        
        scrapedData.push({ title, description, href, source });
    });

    return scrapedData;
}

function getOkay(res) {
    res.json('okay')
};

async function getNewsBySource(res, id) {
    switch(id) {
        case 'elChapuzas':
            const data = await scrapeElChapuzas();
            return res.json(data);
        case 'okay':
            return getOkay(res);
    }
}

module.exports = function (app) {
    app.get('/api/:id', function (req, res) {
        // use mongoose to get all todos in the database
        getNewsBySource(res, req.params.id);
    });
};