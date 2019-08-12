var Ajv = require('ajv');
var express = require('express');
var request = require('request');
var bodyParser = require('body-parser')

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
        body: payload
    }, function (error, response, body){
        //console.log(response);
    });

    }

    else console.log('Invalid: ' + ajv.errorsText(validate.errors));
  }

  res.send("Now Deploying to BIG-IP")
})



app.listen(port, ()=>{
  
});
