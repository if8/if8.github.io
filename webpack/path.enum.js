const path = require('path')

module.exports = {
  root: path.resolve(__dirname, '../'),
  entryPath: path.resolve(__dirname, '../src/index.js'),
  outputPath: path.resolve(__dirname, '../static'),
  publicPath: '/static',
  templatePath: path.resolve(__dirname, '../src/template.html'),
  srcStaticPath: path.resolve(__dirname, '../src/public'),
  imagesFolder: 'images',
  fontsFolder: 'fonts',
  cssFolder: 'css',
  jsFolder: 'js',
  resolveAlias: {
    '@': path.resolve(__dirname, '../src'),
    '@hooks': path.resolve(__dirname, '../src/hooks'),
    '@libs': path.resolve(__dirname, '../src/libs'),
    '@utils': path.resolve(__dirname, '../src/utils'),
    '@pages': path.resolve(__dirname, '../src/pages'),
    '@styles': path.resolve(__dirname, '../src/styles'),
    '@components': path.resolve(__dirname, '../src/components')
  }
}
