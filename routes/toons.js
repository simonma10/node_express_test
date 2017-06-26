var express = require('express');
var router = express.Router();
var fs = require("fs");
var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));


/**
 * GET a list of toons
 */
router.get('/', function (req, res) {
    fs.readFile( "toons.json", 'utf8', function (err, data) {
        console.log('GET toons: ' + data );
        res.send( data );
    });
   //res.send('test response');
});

/**
 * GET a specific toon by its id
 */
router.get('/:id', function (req, res) {
    // First read existing users.
    fs.readFile( "toons.json", 'utf8', function (err, data) {
        var toons = JSON.parse( data );
        var toon = toons[req.params.id]
        //console.log( toon );
        res.send( JSON.stringify(toon));
    });
});

/**
 * GET a specific toon by its name
 */
router.get('/name/:name', function (req, res) {
    var toon;
    // First read existing users.
    fs.readFile( "toons.json", 'utf8', function (err, data) {
        var toons = JSON.parse( data );
        for (var i = 0; i < toons.length; i++){
            //console.log("toon = " + toons[i].name.toLowerCase() + " cp " + req.params.name.toLowerCase());
            if(toons[i].name.toLowerCase() === req.params.name.toLowerCase()){
                res.send( JSON.stringify(toons[i]));
                //console.log( "GET toon by name: " + toons[i].name );
            }
        }
    });
});


module.exports = router;

