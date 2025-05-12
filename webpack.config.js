module.exports = {
  mode: 'production',
  entry: './dist/index.js',
  output: {
    filename: 'index.js',
    path: __dirname + '/dist',
  },
  target: 'node',
};
