const path = require('path')

function resolve(dir) {
  return path.join(__dirname, '.', dir)
}

module.exports = {
  context: path.resolve(__dirname, './'),
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@root': resolve('.'),
      '@': resolve('src'),
      '@renderer': resolve('src/renderer/src')
    }
  }
}
