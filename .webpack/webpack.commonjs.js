const merge = require('webpack-merge');
const webpackBase = require('./webpack.base.js');
const cssToJavaScriptRule = require('./rules/cssToJavaScript.js');
const stylusToJavaScriptRule = require('./rules/stylusToJavaScript.js');

/**
 * WebPack configuration for CommonJS Bundles. Extends rules of BaseConfig by making
 * sure we're bundling styles and other files that would normally be split in a
 * PWA.
 */
module.exports = (env, argv, { SRC_DIR, DIST_DIR }) => {
  const baseConfig = webpackBase(env, argv, { SRC_DIR, DIST_DIR });

  return merge(baseConfig, {
    module: {
      rules: [cssToJavaScriptRule, stylusToJavaScriptRule,
          {
    test: /\.(png|jpg)$/,
    use: {
      loader: 'url-loader',
      options: {
        limit: 25000 // Max file size = 25kb
      }
    }
  },
  {
  test: /\.(png|jpg|gif|svg)$/,
  use: [
    {
      loader: 'file-loader',

    },
  ],
},],
    },
  });
};
