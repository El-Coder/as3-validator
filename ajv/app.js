var Ajv = require('ajv');
var express = require('express');
var request = require('request');
var bodyParser = require('body-parser')
var cors = require('cors')

//JSON Schema
const f5 = require('./f5.json')

//Express variables 
var app = express();
var port = process.env.PORT || 3000;

var ajv = new Ajv();

//Formats needed for Ajv to work with Schema
//TODO add more formats
var ajv = new Ajv({ 
  allErrors: true, 
  unknownFormats: [
      'f5bigip',
      'f5label',
      'f5remark',
      'f5ip',
      'f5pointer',
      'f5base64',
      'f5name',
      'f5long-id'
  ] 
});

var validate = ajv
.compile(f5);

//Parse JSON
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors({
  'allowedHeaders': ['Content-Type'],
  'origin': '*',
  'preflightContinue': true
}));


//POST route
app.post('/eliezersbaby/verify', function (req, res) {
  test(req.body);

  function test(data) {
    var valid = validate(data);
    if (valid) {
      request({
        url: "http://10.1.1.245/mgmt/shared/appsvcs/declare",
        method: "POST",
        json: true,  
        auth: {'user': 'admin',
        'pass': 'admin',},
        body: req.body
    }, function (error, response, body){
        
    });
    res.send('Valid: Now Deploying to BIG-IP')
    }

    else res.send('Invalid: ' + ajv.errorsText(validate.errors));
    
  }

  
})



app.listen(port, ()=>{
  
});
