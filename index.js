"use strict";
const SyncCJit = require("./lib/SyncRustJit");
const path = require('path');

class RustJit
{
    constructor(gypBinPath = "",srcPath="")
    {
        this.gypBinPath = gypBinPath===""?"node-gyp":gypBinPath;
        this.srcPath = srcPath===""?path.join(__dirname,"srcPath"):srcPath;
        this.templatePath = path.join(__dirname,'template');
        this.asyncCJit = new AsyncCJit(this.gypBinPath,this.srcPath,this.templatePath);
        this.syncCJit = new SyncCJit(this.gypBinPath,this.srcPath,this.templatePath);
    }
    
    runSync(code)
    {
        return (new Tools(this.syncCJit)).init(code).run();
    }
    
    runByFileSync(filePath)
    {
        return (new Tools(this.syncCJit)).initByfile(filePath).run();
    }

}
module.exports = CJit;