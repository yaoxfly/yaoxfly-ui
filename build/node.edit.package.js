const path = require('path')
const resolve = (...file) => path.resolve(__dirname, ...file)
const fs = require('fs')
const chalk = require('chalk')
const successLog = (message) => console.log(chalk.blue(`${message}`))
function getPackageJson () {
    const _packageJson = fs.readFileSync(resolve('../package.json'))
    return JSON.parse(_packageJson)
}
const writePackageJson = function (main = 'lib/eve-ui.umd.min.js') {
    const packageJsonData = getPackageJson()
    packageJsonData.main = main
    // 2代表格式化数据的时候前面填充2个空格
    fs.writeFile(resolve('../package.json'), JSON.stringify(packageJsonData, null, 2), function (err) {
        if (err) console.error(err)
        successLog('package.json文件已经更新')
    })
}
exports.writePackageJson = writePackageJson