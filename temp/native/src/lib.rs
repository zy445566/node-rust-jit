#[macro_use]
extern crate neon;

use neon::vm::{Call, JsResult};

fn temp(call: Call) -> JsResult<neon::js::JsString> {
    let scope = call.scope;
    Ok(neon::js::JsString::new(scope, "temp node").unwrap())
}

register_module!(m, {
    m.export("temp", temp)
});
