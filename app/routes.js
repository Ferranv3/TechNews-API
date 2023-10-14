const getNewsBySource = require('./controllers/newsController');
const getArticleBySource = require('./controllers/articleController');

module.exports = function (app) {
    app.get('/api/article', function (req, res) {
        const id = req.query.id;
        if (id) {
            getArticleBySource(res, id);
        } else {
            res.status(400).send('ID de artículo requerido');
        }
    });

    app.get('/api/:id', function (req, res) {
        res.header('Access-Control-Allow-Origin', '*')
        getNewsBySource(res, req.params.id);
    });
};