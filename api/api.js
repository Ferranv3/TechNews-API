import express from 'express';
import scrapeElChapuzas from './scrapeElChapuzas';

const app = express();
const port = process.env.PORT || 3000;

app.get('/scrape', async (req, res) => {
  const { source } = req.query;
  let scrapedData = [];
  switch(source) {
    case 'elchapuzas':
      scrapedData = await scrapeElChapuzas();
      break;
    default:
      res.status(400).json({ error: 'Invalid source.' });
      return;
  }
  res.status(200).json(scrapedData);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
