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
   childProcess.execSync('node ' + path.toString(),  {stdio: 'inherit'});   
   console.log();
}

function runSync(tests) {
    console.log('\x1b[47m', '\x1b[30m', `BEGIN TEST EXECUTION - Total: ${tests.length} `, '\x1b[0m');
    console.log();
    for (const index in tests) {
        run(tests[index]);
    }
}

const tests = [];
fromDir('src/test', /\.testy.js$/, tests);
runSync(tests);
console.log('\x1b[42m', '\x1b[30m', `\u2705\u2705 FINISHED RUNNING ALL TESTS - ALL PASSED - Total: ${tests.length} \u2705\u2705`, '\x1b[0m');

