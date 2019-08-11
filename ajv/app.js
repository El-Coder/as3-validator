var Ajv = require('ajv');
const f5 = require('./f5.json')
const payload = require('./test.json')
var ajv = new Ajv();

var validate = ajv.addFormat('f5bigip', /./)
.addFormat('f5label', /./)
.addFormat('f5remark', /./)
.addFormat('f5ip', /./)
.addFormat('f5pointer', /./)
.addFormat('f5base64', /./)
.addFormat('f5name', /./)
.addFormat('f5long-id', /./)
.compile(f5);

test(payload);

function test(data) {
  var valid = validate(data);
  if (valid) console.log('Valid!');
  else console.log('Invalid: ' + ajv.errorsText(validate.errors));
}