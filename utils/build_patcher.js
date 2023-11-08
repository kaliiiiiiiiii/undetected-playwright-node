const fs = require('fs');

function patch_driver(path){
    console.log("Patching driver for " + path)

    function commentRuntimeEnable(path){
        fileText = fs.readFileSync(path, 'utf8')
        const regex = new RegExp(".*Runtime\.enable.*", "g");
        const matchedRegex = fileText.match(regex)
        for(const target of matchedRegex){
            fileText = fileText.replace(target, "// " + target);
        }
        fs.writeFileSync(path,fileText)
        return true
    }

    // comment occurencies of Runtime.Enable 
    const filesToPatch = ["crDevTools.ts", "crPage.ts","crServiceWorker.ts"]
    for( file of filesToPatch){
        if(commentRuntimeEnable(path + "chromium/" + file)){
            console.log("Succesfully patched " + file)
        }
    }

    // patching execution context 
    frames_path = path + "frames.js"
}

patch_driver('../packages/playwright-core/src/server/')