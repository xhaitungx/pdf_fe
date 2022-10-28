const path = require("path");
const HardSourceWebpackPlugin = require("hard-source-webpack-plugin");

module.exports = {
  target: "electron-main",
  entry: "./main.js",
  output: {
    path: path.resolve(__dirname, "./build"),
    filename: "main.js",
  },
  resolve: {
    extensions: [".ts", ".js", ".tsx"],
  },
  node: {
    __dirname: false,
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        loaders: [
          "react-hot",
          "babel?presets[]=react,presets[]=es2015,presets[]=stage-0",
        ],
      },
    ],
  },
  plugins: [["@babel/plugin-proposal-class-properties", { loose: true }]],
};
