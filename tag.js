var process = require('child_process');

//  获取版本
var newVersion = require('./package.json').version;

//  子进程完成后的回调
function cb(error, stdout, stderr) {
  console.log(stdout);
  if (error !== null) {
    console.log('exec error: ' + error);
  }
}

process.exec(`git add .`,cb);
process.exec(`git commit -am "new version"`,cb);

//  打tag
process.exec(`git tag -a ${newVersion} -m "new version: ${newVersion}"`,cb);

process.exec(`git push origin master`,cb);
//  推tag
process.exec(`git push origin ${newVersion}`,cb);