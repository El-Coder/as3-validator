var Ajv = require('ajv');
const f5 = require('./f5.json')
const payload = require('./test.json')
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
// That's not all of the formats...

test(payload);

function test(data) {
  var valid = ajv.validate(f5, data);
  if (valid) console.log('Valid!');
  else console.log('Invalid: ' + ajv.errorsText(valid.errors));
}