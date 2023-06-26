const getNewsBySource = require('./controllers/newsController');

module.exports = function (app) {
    app.get('/api/:id', function (req, res) {
        getNewsBySource(res, req.params.id);
    });
};