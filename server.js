// set up ======================================================================
var express = require('express');
var cors = require('cors');
var app = express(); 						// create our app w/ express
var port = process.env.PORT || 8080; 				// set the port
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var allowedOrigins = ['http://localhost:3000', 'https://technews-ferran.vercel.app'];

app.use(cors({
  origin: function(origin, callback){
    // permitir solicitudes sin 'origin' (como las de las aplicaciones móviles o curl)
    if(!origin) return callback(null, true);
   
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'La política de CORS para este sitio no permite el acceso desde el origen especificado.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({'extended': 'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request


// routes ======================================================================
require('./app/routes.js')(app);

// listen (start app with node server.js) ======================================
app.listen(port);
console.log("App listening on port " + port);
