
//\/\ark 
'use strict';
const express = require('express');
const utils = require('./modules/utils.js');

const app = express();
const port = 3000
const fs = require('fs');

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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());

//express
app.listen(port, () => console.log(` app listening on port ${port}!`))
//http node server
// app.listen = function() {
//   var server = http.createServer(function(req,res){
//
//   });
//   console.log("Server on port ${port}");
//   return server.listen.apply(server, arguments);
// };
//
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

app.post('/identify',upload.array(), function (req, res, next) {
    var bufferImage = utils.bufferImage(req.body);
    var arr = [];
    const labels = require('./modules/detect');
    const lbArray =  labels.LabelDetection;

    //    var arr = ["glasses","facial hair","vision care","eyewear","chin","electronic device","portrait","beard","sunglasses","fun"];
    //fs.writeFile('image.jpeg', bufferImage);
    //res.send(arr)
    //res.end();

    lbArray.getLabelDescription(bufferImage)
            .then(function(resp){
                resp.forEach(function(label){
                     console.log(label.description);
                     arr.push(label.description);
                })
                res.send(JSON.stringify(arr));
    })
});

app.post('/test', function (req, res,next) {
    res.sendFile(path.join(__dirname,  '/html/ts.html'));
});