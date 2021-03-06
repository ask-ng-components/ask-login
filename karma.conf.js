'use strict';

var path = require('path');
var wiredep = require('wiredep');

function listFiles() {

  var wiredepOptions = {
    dependencies: true,
    devDependencies: true
  };

  return wiredep(wiredepOptions).js
    .concat([
      'src/**/*.js',      'src/**/*.html'
    ]);
}

module.exports = function(config) {

  var configuration = {
    files: listFiles(),

    singleRun: true,

    autoWatch: false,

    ngHtml2JsPreprocessor: {
      stripPrefix: 'src/',
      moduleName: 'ask.component.login'
    },

    logLevel: 'WARN',

    frameworks: ['jasmine', 'angular-filesort'],

    angularFilesort: {
      whitelist: ['src/**/!(*.html|*.spec|*.mock).js']
    },

    reporters: ['progress'],

    preprocessors: {
      'src/**/*.html': ['ng-html2js']
    },
    browsers : ['PhantomJS'],

    plugins : [
      'karma-phantomjs-launcher',
      'karma-angular-filesort',

      'karma-jasmine',
      'karma-ng-html2js-preprocessor'
    ]
  };

  // This block is needed to execute Chrome on Travis
  // If you ever plan to use Chrome and Travis, you can keep it
  // If not, you can safely remove it
  // https://github.com/karma-runner/karma/issues/1144#issuecomment-53633076
  if(configuration.browsers[0] === 'Chrome' && process.env.TRAVIS) {
    configuration.customLaunchers = {
      'chrome-travis-ci': {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    };
    configuration.browsers = ['chrome-travis-ci'];
  }

  config.set(configuration);
};
