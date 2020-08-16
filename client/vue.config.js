var path = require("path");

module.exports = {
  transpileDependencies: ["vuetify"],
  devServer: {
    headers: { "Access-Control-Allow-Origin": "*" },
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    //https: true,
    host: "192.168.1.100",
    port: 8080,
    watchOptions: {
      poll: true
    },
    disableHostCheck: false,
    proxy: {
      "/v1": {
        target: "http://192.168.1.100:4200"
      }
    },
    stats: {
      colors: true
    }
  }
};
