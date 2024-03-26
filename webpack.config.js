const path = require('path');

module.exports = {
  entry: ['./src/ts/App.ts', './src/ts/Note.ts', './src/ts/Login.ts', './src/ts/Search.ts', './src/ts/Aside.ts', './src/ts/Tags.ts', './src/ts/Modal.ts' ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public/js'),
  },
  mode: 'development'
}