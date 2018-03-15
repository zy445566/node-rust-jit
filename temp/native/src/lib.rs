#[macro_use]
extern crate neon;

use neon::vm::{Call, JsResult};

fn code_md59768ea364cbf85aec40104bce0e9a99b(call: Call) -> JsResult<neon::js::JsInteger> {
        let scope = call.scope;
    let option_num = call.arguments.get(scope,0);
    let mut num:i32 = 0;
    if let Some(x1) = option_num {
        if let neon::js::Variant::Integer(x2) = x1.variant() {
            num = x2.value() as i32;
        }
    }
    let mut fibnum:i32 = 0;
    if num<2 {
        fibnum = 1;
    } else {
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
}

register_module!(m, {
    m.export("code_md59768ea364cbf85aec40104bce0e9a99b", code_md59768ea364cbf85aec40104bce0e9a99b)
});
