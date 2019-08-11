// const Ajv = require('ajv');
// const ajv = new Ajv();

// // Fetch the JSON content, pretending it was downloaded from a URL
// const userSchema = require('./f5.json')

// // Make a little helper for validating
// function validate(schema, data) {
//   return ajv.validate(schema, data)
//     ? true : ajv.errors;
// }

// // Pretend we've submitted a form
// const input = {
//     "foo": 12345,
//     "bar": "a"
//    }

// // Is the whole input valid?
// console.log('valid', validate(userSchema, input))
//////////////////////////////////////////////////////////
// const Ajv = require('Ajv');
// //const ajv = new Ajv({allErrors: true});
// const schema = require('./f5.json')

// // Schema from the example above
// const validate = new Ajv().compile(schema).addFormat('f5bigip');
var Ajv = require('ajv');
const f5 = require('./f5.json')
const payload = require('./test.json')
var ajv = new Ajv();
var validate = ajv.addFormat('f5bigip').compile(f5);

test(payload);

function test(data) {
  var valid = validate(data);
  if (valid) console.log('Valid!');
  else console.log('Invalid: ' + ajv.errorsText(validate.errors));
}