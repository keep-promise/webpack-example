// 编写完成注释
// import { Configuration } from 'webpack'; // 编写完成注释


/**
 * @type Configuration
 */
module.exports = {
  mode: 'none',
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    library: 'a',
    libraryTarget: 'umd'
  }
};
