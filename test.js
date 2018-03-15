const CJit = require("./index");
const path = require("path");
const assert = require('assert');

let cJit  = new CJit();

let code = `
if (info.Length() < 2) {
  Nan::ThrowTypeError("Wrong number of arguments");
  return;
}

if (!info[0]->IsNumber() || !info[1]->IsNumber()) {
  Nan::ThrowTypeError("Wrong arguments");
  return;
}

double arg0 = info[0]->NumberValue();
double arg1 = info[1]->NumberValue();
v8::Local<v8::Number> num = Nan::New(arg0 + arg1);

info.GetReturnValue().Set(num);
`;


assert.equal(funcByfileSync(value1,value2),value1+value2,"funcByfileSync error");








