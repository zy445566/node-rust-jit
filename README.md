# node-rust-jit
[![Build Status](https://travis-ci.org/zy445566/node-rust-jit.svg?branch=master)](https://travis-ci.org/zy445566/node-rust-jit) 
=========
## node.JS run Rust language Just In Time

Installation
------------

You can install with `npm`:

``` bash
$ npm install rust-jit
```

Prepare
------------
``` sh
npm install -g neon-cli
```

You will also need to install:

### On Unix

   * [Rust](https://www.rust-lang.org)
   * `make`
   * A proper C/C++ compiler toolchain, like [GCC](https://gcc.gnu.org)

### On Mac OS X

   * [Rust](https://www.rust-lang.org)
   * [Xcode](https://developer.apple.com/xcode/download/)
     * You also need to install the `Command Line Tools` via Xcode. You can find this under the menu `Xcode -> Preferences -> Downloads`
     * This step will install `gcc` and the related toolchain containing `make`

### On Windows

#### Option 1

Install all the required tools and configurations using Microsoft's [windows-build-tools](https://github.com/felixrieseberg/windows-build-tools) using `npm install --global --production windows-build-tools` from an elevated PowerShell or CMD.exe (run as Administrator).

#### Option 2

Install tools and configuration manually:
   * Visual C++ Build Environment:
     * Option 1: Install [Visual C++ Build Tools](http://landinghub.visualstudio.com/visual-cpp-build-tools) using the **Default Install** option.

     * Option 2: Install [Visual Studio 2015](https://www.visualstudio.com/products/visual-studio-community-vs) and select *Common Tools for Visual C++* during setup. This also works with the free Community and Express for Desktop editions.

     * Option 3: if you already have Visual Studio 2015 installed and did not install the
            *Common Tools for Visual C++* during setup, you can `File -> New -> Project`, pick
            any of the options under `Templates -> Other Languages -> Visual C++` then `Ok`
            and Visual Studio will offer to install the *Common Tools for Visual C++* with a
            "Install Missing Features" / "You need the Universal Windows App Development Tools
            to develop Windows app projects." dialog.

     > :bulb: [Windows Vista / 7 only] requires [.NET Framework 4.5.1](http://www.microsoft.com/en-us/download/details.aspx?id=40773)

   * Install [Rust](https://www.rust-lang.org)
   * Launch cmd, `npm config set msvs_version 2015`

   If the above steps didn't work for you, please visit [Microsoft's Node.js Guidelines for Windows](https://github.com/Microsoft/nodejs-guidelines/blob/master/windows-environment.md#compiling-native-addon-modules) for additional tips.


How to Use
----------
## notice:The compilation is to be put in the startup file of node.js because it is time consuming
## example
```node
const RustJit = require("rust-jit");
const path = require("path");

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

let rustFibByFile = rustJit.compileByFileSync(path.join(__dirname,"test.rs"),'JsInteger');
console.log("rustJit.compileByFileSync fib(6)=>8:"+rustFibByFile(6));
```

Grammar
----------
[neon](https://www.neon-bindings.com/)
[grammar-example](https://github.com/neon-bindings/examples)
[neon-github](https://github.com/neon-bindings/neon)

