var express = require('express');
var app = express();
var ejs = require('ejs');


var port = process.env.PORT || 8001;

app.set('port', port);

app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false}));



app.get('/', function (request, response) {
    response.render('index');

})

var exportedFunction = require('./controller')

exportedFunction(app);



app.listen(port, function(){
    console.log('app is running');
});