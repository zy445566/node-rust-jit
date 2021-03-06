const RustJit = require("./index");
const path = require("path");
const assert = require('assert');

let rustJit  = new RustJit();

let code = `
    let scope = call.scope;
    let option_num = call.arguments.get(scope,0);
    let mut num:i32 = 0;
    if let Some(x1) = option_num {
        if let neon::js::Variant::Integer(x2) = x1.variant() {
            num = x2.value() as i32;
        }
    }
    let mut fibnum:i32 = 1;
    if num>2 {
        let mut a:i32 = 1;
        let mut b:i32 = 1;
        let mut c:i32 = 0;
        for _i in 2..num {
            c=a+b;
            a=b;
            b=c;
        }
        fibnum = c;
    }
    
    Ok(neon::js::JsInteger::new(scope, fibnum))
`;
let rustFibByCode = rustJit.compileSync(code,'JsInteger');
console.log("rustJit.compileSync fib(5)=>5:"+rustFibByCode(5));
assert.equal(rustFibByCode(5),5,"rustJit.runSync error");

let rustFibByFile = rustJit.compileByFileSync(path.join(__dirname,"test.rs"),'JsInteger');
console.log("rustJit.compileByFileSync fib(6)=>8:"+rustFibByFile(6));
assert.equal(rustFibByFile(6),8,"rustJit.runByFileSync error");







