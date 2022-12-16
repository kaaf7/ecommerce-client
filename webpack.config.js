const path = require("path");


module.exports = () => ({
  entry: [
    "@babel/polyfill",
    path.join(__dirname, "client", "style.css"),
    path.join(__dirname, "client", "src", "start.js"),
  ],
  output: {
    path: path.join(__dirname, "client", "public"),
    filename: "bundle.js",
  },
  performance: {
    hints: false,
  },
  devServer: {
    static: path.join(__dirname, "client", "public"),
    proxy: {
      "/": {
        target: "https://ecomm-frontend-client.onrender.com",
      },
      "/socket.io": {
        target: "https://ecomm-frontend-client.onrender.com",
        ws: true,
      },
    },
  },
});
