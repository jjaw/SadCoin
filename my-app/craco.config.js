const { whenDev } = require("@craco/craco");
const path = require('path');

module.exports = {
  webpack: {
    alias: {
      'stream': path.resolve(__dirname, 'node_modules', 'stream-browserify')
    }
  },
  devServer: whenDev(() => ({
    compress: true,
  }))
};
