const path = require('path')
const fs = require('fs')
const resolve = (...file) => path.resolve(__dirname, ...file)
const chalk = require('chalk')
// const log = (message) => console.log(chalk.green(`${message}`))
const successLog = (message) => console.log(chalk.blue(`${message}`))
const ora = require('ora')
const spinner = ora('deleted main.js ...' + '\n')
spinner.start()
// const errorLog = (error) => console.log(chalk.red(`${error}`))
const text = resolve('../lib', 'main.js')
// log(text)
fs.unlink(text, (err) => {
    if (err) throw err
    setTimeout(() => {
        spinner.stop()
        successLog('lib/main.js was deleted')
    }, 1000)
})