const child_process = require('child_process');
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const crypto = require('crypto');

class SyncRustJit
{
    constructor(neonBinPath,templatePath,binPath)
    {
        this.neonBinPath = neonBinPath;
        this.binPath = binPath;
        this.templatePath = templatePath;
    }

    md5 (text) 
    {
        return crypto.createHash('md5').update(text).digest('hex')
    }

    getCodeMd5(code)
    {
        return "code_md5"+this.md5(code);
    }

    renderFile(templatePath,newPath,data)
    {
        let templateStr = fs.readFileSync(templatePath).toString();
        let newStr = ejs.render(templateStr,data); 
        fs.writeFileSync(newPath,newStr);
    }

    copyTemplate(codeMd5,JsResultType,code)
    {
        let nativePath = path.join(this.templatePath,"native");
        let srcPath = path.join(nativePath,"src");
        let rustPath = path.join(srcPath,"lib.rs.ejs");
        let newRustPath = path.join(srcPath,"lib.rs");
        this.renderFile(rustPath,newRustPath,{
            JsResultType:JsResultType,
            codeMd5:codeMd5,
            code:code
        });
        let tomlPath = path.join(nativePath,"Cargo.toml.ejs");
        let newTomlPath = path.join(nativePath,"Cargo.toml");
        this.renderFile(tomlPath,newTomlPath,{
            codeMd5:codeMd5,
        });
        return true;
    }

    execNeon(command)
    {
        return child_process.execSync(`cd ${this.templatePath} && ${this.neonBinPath} ${command}`);
    }

    moveNode(codeMd5)
    {
        if (fs.existsSync(this.getBinNode(codeMd5))){return false;}
        let oldPath = path.join(this.templatePath,"native","index.node");
        let newPath = path.join(this.binPath,`${codeMd5}.node`);
        return fs.renameSync(oldPath, newPath);
    }

    getBinNode(codeMd5)
    {
        return path.join(this.binPath,`${codeMd5}.node`);
    }

    build(codeMd5)
    {
        if (fs.existsSync(this.getBinNode(codeMd5))){return false;}
        return this.execNeon("build");
    }

    clean(codeMd5)
    {
        return this.execNeon("clean");
    }

    remove(codeMd5)
    {
        fs.unlinkSync(this.getBinNode(codeMd5));
    }

    removeAll()
    {
        let files = fs.readdirSync(this.binPath);
        for(let filename of files)
        {
            if(filename=="README.md"){continue;}
            let filePath = path.join(codePath,filename);
            let stats = fs.statSync(filePath);
            if (!stats.isDirectory())
            {
                fs.unlinkSync(filePath);
            }
        }
    }

    getRelease(code,JsResultType)
    {
        let codeMd5 = this.getCodeMd5(code);
        this.copyTemplate(codeMd5,JsResultType,code);
        this.build(codeMd5);
        this.moveNode(codeMd5);
        return require(this.getBinNode(codeMd5))[codeMd5];
    }
}

module.exports = SyncRustJit;