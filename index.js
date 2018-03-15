"use strict";
const SyncRustJit = require("./lib/SyncRustJit");
const path = require('path');

class RustJit
{
    constructor(neonBinPath = "",binPath="")
    {
        this.neonBinPath = neonBinPath===""?"neon":neonBinPath;
        this.binPath = binPath===""?path.join(__dirname,"binPath"):binPath;
        this.templatePath = path.join(__dirname,'temp');
        this.syncRustJit = new SyncRustJit(this.gypBinPath,this.templatePath,this.binPath);
    }
    
    runSync(code,JsResultType)
    {
        return this.syncRustJit.getRelease(code);
    }
    
    runByFileSync(filePath,JsResultType)
    {
        return this.syncRustJit.getRelease(fs.readFileSync(filePath).toString());
    }

    getSyncRustJit()
    {
        return this.syncRustJit;
    }

}
module.exports = CJit;