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