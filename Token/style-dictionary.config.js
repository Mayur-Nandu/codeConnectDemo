import "./jsFormatter.js";
import "./scssFormatter.js";

export default {
  source: ['Token/token.json'],
  platforms: {
    css: {
      transformGroup: 'scss',
      buildPath: 'Token/variables/',
      files: [{
        destination: 'variables.scss',
        format: 'scss/custom-variables'
      }]
    },
    js: {
      transformGroup: 'js',
      buildPath: 'Token/variables/',
      files: [{
        destination: 'variables.js',
        format: 'javascript/nested'
        //'javascript/es6'
      }]
    }
  }
};