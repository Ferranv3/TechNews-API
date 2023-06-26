const axios = require('axios');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

async function scrapeElChapuzas() {
    const url = 'https://elchapuzasinformatico.com/';
    const response = await axios(url);
    const html = response.data;
    const $ = cheerio.load(html);
    const articles = $('article.blog-item');

    const scrapedData = await Promise.all(
        articles.map(async (index, element) => {
            const link = $(element).find('a.rocket-lazyload');
            const title = $(element).find('h2.entry-title a').text();
            const description = $(element).find('p.post-excerpt').text();
            const href = link.attr('href');
            const img = undefined;//await scrapeIMGArticle(href);
            
            return { title, description, href, img };
        }).get()
    );

    return scrapedData;
}

async function scrapeIMGArticle(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: 'networkidle2' });

    const img = await page.evaluate(() => {
        const imgElement = document.querySelector('div.post-content p img');
        return imgElement ? imgElement.src : null;
    });

    await browser.close();
    return img;
}

module.exports = scrapeElChapuzas;