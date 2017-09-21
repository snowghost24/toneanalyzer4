//exports any file you want to retrieve

var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');

var outgoingText = '';
module.exports = function (app) {

    app.post('/', function (req, res) {
        console.log(req.body);

        var tone_analyzer = new ToneAnalyzerV3({
            username: "d3215826-655a-4cd9-af42-40076f346f0f",
            password: "Y3EjFoa1M7I2",
            version_date: "2016-05-19"
        });

        var params = {
            // Get the text from the JSON file.
            text: req.body.text,
            tones: 'emotion, social'
        };

        tone_analyzer.tone(params, function (error, response) {
            if (error)
                console.log('error:', error);
            else
                //console.log(JSON.stringify(response, null, 2));
            outgoingText = (JSON.stringify(response, null, 2));
            console.log(outgoingText);
            res.send(outgoingText);
        });
     
    })
    //return outgoingText;
}