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

function shellWithPromise(cmd) {
  return new Promise(res => {
    process.exec(cmd, (error, stdout, stderr) => {
      cb(error, stdout, stderr);
      res();
    })
  })
}
async function run() {
  //  添加文件
  await shellWithPromise(`git add .`);
  //  打commit
  await shellWithPromise(`git commit -am "new version"`);
  //  打tag
  await shellWithPromise(`git tag -a ${newVersion} -m "new version: ${newVersion}"`);
  //  推到master
  await shellWithPromise(`git push origin master`);
  //  推tag
  await shellWithPromise(`git push origin ${newVersion}`);
}
run();