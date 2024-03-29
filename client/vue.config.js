var path = require("path");

module.exports = {
  transpileDependencies: ["vuetify"],
  devServer: {
    headers: { "Access-Control-Allow-Origin": "*" },
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    //https: true,
    host: "127.0.0.1",
    port: 8080,
    watchOptions: {
      poll: true
    },
    disableHostCheck: false,
    proxy: {
      "/v1": {
        target: "http://127.0.0.1:7847"
      },
      "/docs": {
        target: "http://127.0.0.1:7847"
      }
    },
    stats: {
      colors: true
    }
  }
};
