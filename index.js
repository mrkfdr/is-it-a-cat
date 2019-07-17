
    //\/\ark
    'use strict';

const express = require('express');
const utils = require('./modules/utils.js');
const classifyGoogle = require('./modules/classify.js');

const request = require("request");
const app = express();
const port = 3000
const fs = require('fs');
//const CognitiveServicesCredentials = require('ms-rest-azure').CognitiveServicesCredentials;
//const WebSearchAPIClient = require('azure-cognitiveservices-websearch');
const https = require('https')
const detectApi = require('./modules/detect');

var router = express.Router();
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var path = require('path');

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "/html/pugViews"));

app.use(express.static(path.join(__dirname, '/html')));
app.use(express.static(path.join(__dirname, '/img')));
app.use(express.static(path.join(__dirname, '/iscat')));
app.use(express.static(path.join(__dirname, '/iscat/src')));

//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text({limit: '30mb', extended: true}));

app.use(bodyParser.json({limit: '30mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}))

app.listen(process.env.PORT || 8080, () => console.log(`iscat running on port 8080`))

app.get('/', function (req, res) {
     res.sendFile(path.join(__dirname,  'index.html'));
 });

app.post('/camera', function (req, res,next) {
    if (req.body.image){
        res.sendFile(path.join(__dirname,  '/html/result.html'));
    } else {
        res.sendFile(path.join(__dirname,  '/html/camera.html'));
    }
});

app.post('/identifyimage', function (req, res, next) {
    var bufferImage = utils.bufferImage(req.body);
    var arr = [];
    const lbArray =  detectApi.ImageAnnotation;
    //var image = req.body.replace("data:image/jpeg;base64,","")
    lbArray.getImageAnnotation(bufferImage)
            .then(function(resp){
                var jsonData = classifyGoogle.recieveddata(resp)
                res.send(JSON.stringify(jsonData))
                res.end()
            })
});
