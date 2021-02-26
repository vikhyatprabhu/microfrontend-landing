const { merge } = require("webpack-merge");

const commonConfig = require("./webpack.common");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const packageJson = require("../package.json");

const devConfig = {
  mode: "development",
  output : {
    publicPath:'http://localhost:8081/'
},
  devServer: {
    port: 8081,
    historyApiFallback: {
      index: "/index.html",
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        marketing: "marketing@http://localhost:8082/remoteEntry.js",
        auth : "auth@http://localhost:8083/remoteEntry.js",
        dashboard : "dashboard@http://localhost:8084/remoteEntry.js",
      },
      shared: packageJson["dependencies"],
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
