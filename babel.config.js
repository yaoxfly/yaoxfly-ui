let transformRemoveConsolePlugin = []
if (process.env.NODE_ENV === 'production') {
  transformRemoveConsolePlugin = [
    ['transform-remove-console', { exclude: ['error', 'warn'] }]
  ]
}
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [...transformRemoveConsolePlugin]
}

