import path from 'path';
import fs from 'fs';
import childProcess from 'child_process';

function fromDir(startPath,filter, tests) {
    if (!fs.existsSync(startPath)){
        console.log("no dir ",startPath);
        return;
    }

    var files=fs.readdirSync(startPath);
    for(var i=0;i<files.length;i++){
        var filename=path.join(startPath,files[i]);
        var stat = fs.lstatSync(filename);
        if (stat.isDirectory()){
            fromDir(filename,filter, tests); //recurse
        }
        else if (filter.test(filename)) {
            tests.push(filename);
        }
    };
};

function run(path) {
   childProcess.exec('node ' + path.toString(), (error, stdout, stderr) => 
   {
        if (error !== null) {
            throw new Error(stdout);
        } else {
            console.log(stdout);
        }
   })    
}

function runSync(tests) {
    for (const index in tests) {
        run(tests[index]);
    }
}

const tests = [];
fromDir('src/test', /\.testy.js$/, tests);
runSync(tests);
console.log('\x1b[42m', '\x1b[30m', `\u2705\u270c\u2705\u270c FINISHED RUNNING ALL TEST - ALL TESTS PASSED \u2705\u270c\u2705\u270c`, '\x1b[0m');

