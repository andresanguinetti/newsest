const http = require('http');

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var router = express.Router();

var trainingSetRoutes = require('./routes/TrainingSetRoutes');
var preprocessingRoutes = require('./routes/PreprocessingRoutes');
var testRoutes = require('./routes/TestRoutes');

app.set('view engine', 'pug');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', router);

// Renders the Home page
router.get('/', function(req, res) {
  res.render('index');
});

router.use('/training-set', trainingSetRoutes);
router.use('/preprocessing', preprocessingRoutes);
router.use('/test', testRoutes);

httpServer = http.createServer(app);

let httpPort = process.env.PORT || 8081;

httpServer.listen(httpPort, () => {
 console.log('NewsEST Server running on port ' + httpPort);
});
