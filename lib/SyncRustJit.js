const child_process = require('child_process');
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

class SyncRustJit
{
    constructor(neonBinPath,templatePath,binPath)
    {
        this.neonBinPath = neonBinPath;
        this.binPath = binPath;
        this.templatePath = templatePath;
    }

    renderFile(templatePath,newPath,data)
    {
        let templateStr = fs.readFileSync(templatePath).toString();
        let newStr = ejs.render(templateStr,data); 
        fs.writeFileSync(newPath,newStr);
    }

    copyTemplate(codeMd5,JsResultType,code)
    {
        let rustPath = path.join(this.templatePath,"native","lib.rs.ejs");
        let newRustPath = path.join(this.templatePath,"native","lib.rs.ejs");
        this.renderFile(rustPath,newRustPath,{
            JsResultType:JsResultType,
            codeMd5:codeMd5,
            code:code
        });
        return true;
    }

    execNeon(codePath,command)
    {
        return child_process.execSync(`cd ${this.templatePath} && ${this.neonBinPath} ${command}`);
    }

    moveNode(codeMd5)
    {
        let oldPath = path.join(this.templatePath,"native","index.node");
        let newPath = path.join(this.binPath,`${codeMd5}.node`);
        return fs.renameSync(oldPath, newPath);
    }

    build(codeMd5)
    {
        
    }

    getRelease(codeMd5,code)
    {
        this.copyTemplate(codeMd5,codePath,code);
        this.configure(codeMd5,codePath);
        this.build(codeMd5,codePath);
        return require(path.join(this.binPath,`${codeMd5}.node`))[codeMd5];
    }
}

module.exports = SyncCJit;