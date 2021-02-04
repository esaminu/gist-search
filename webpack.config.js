var path = require("path");

module.exports = {
  mode: "development",
  entry: "./index.jsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: '/dist',
    filename: "bundle.js"
  },
  resolve: {
    extensions: ['.ts', '.jsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/env",
                "@babel/react",
              ],
            },
          },
        ],
      },
    ],
  },
};
