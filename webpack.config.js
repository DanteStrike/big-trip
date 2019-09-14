const path = require(`path`);
const MomentLocalesPlugin = require(`moment-locales-webpack-plugin`);

module.exports = {
  mode: `development`,
  entry: `./src/main.js`,

  output: {
    path: path.join(__dirname, `public`),
    filename: `bundle.js`
  },

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [`style-loader`, `css-loader`],
      }
    ]
  },

  plugins: [
    new MomentLocalesPlugin({
      localesToKeep: [`es-us`],
    }),
  ],

  devtool: `source-map`,

  devServer: {
    contentBase: path.join(__dirname, `public`),
    publicPath: `http://localhost:8080`,
    compress: true,
    watchContentBase: true
  }
};
