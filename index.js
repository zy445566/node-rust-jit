"use strict";
const SyncRustJit = require("./lib/SyncRustJit");
const path = require('path');
const fs = require('fs');

class RustJit
{
    constructor(neonBinPath = "",binPath="")
    {
        this.neonBinPath = neonBinPath===""?"neon":neonBinPath;
        this.binPath = binPath===""?path.join(__dirname,"binPath"):binPath;
        this.templatePath = path.join(__dirname,'temp');
        this.syncRustJit = new SyncRustJit(this.neonBinPath,this.templatePath,this.binPath);
    }
    
    runSync(code,JsResultType)
    {
        return this.syncRustJit.getRelease(code,JsResultType);
    }
    
    runByFileSync(filePath,JsResultType)
    {
        return this.syncRustJit.getRelease(fs.readFileSync(filePath).toString(),JsResultType);
    }

    getSyncRustJit()
    {
        return this.syncRustJit;
    }

}
module.exports = RustJit;