const RustJit = require("./index");
const path = require("path");
const assert = require('assert');

let rustJit  = new RustJit();

let code = `
    let scope = call.scope;
    let option_num = call.arguments.get(scope,0);
    let mut num:i32 = 0;
    if let Some(x1) = option_num {
        if let Variant::Integer(x2) = x1.variant() {
            num = x2.value() as i32;
        }
    }
    let mut fibnum:i32 = 0;
    if i<2 {
        fibnum = 1;
    } else {
        let mut a:i32 = 1;
        let mut b:i32 = 1;
        let mut c:i32 = 0;
        for i in 2..num {
            c=a+b;
            a=b;
            b=c;
        }
        fibnum = c;
    }
    
    Ok(neon::js::JsInteger::new(scope, fibnum))
`;
let runSyncRes = rustJit.runSync(code,'JsInteger')(3);
assert.equal(runSyncRes,3,"rustJit.runSync error");

let runByFileSyncRes = rustJit.runByFileSync(path.join(__dirname,"test.rs"),'JsInteger')(3);
assert.equal(runByFileSyncRes,3,"rustJit.runByFileSync error");








