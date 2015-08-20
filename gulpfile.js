'use strict';

var gulp = require('gulp');
var path = require('path');
var karma = require('karma');

var ngmod = 'ask.component.login';

var $ = require('gulp-load-plugins')();

gulp.task('build', function () {
  var htmlFilter = $.filter('**/*.html');
  var jsFilter = $.filter('**/*.js');

  return gulp.src([
    './src/**',
    '!./src/**/*.spec.js'
  ])
    .pipe(htmlFilter)
    .pipe($.minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe($.angularTemplatecache(ngmod + '.tpl.js',{
      module: ngmod
    }))
    .pipe($.iife())
    .pipe(htmlFilter.restore())
    .pipe(jsFilter)
    .pipe($.angularFilesort())
    .pipe($.concat(ngmod + '.bundle.js'))
    .pipe(jsFilter.restore())
    .pipe(gulp.dest('./dist/'));
});


function runTests (singleRun, done) {
  karma.server.start({
    configFile: path.join(__dirname, '/karma.conf.js'),
    singleRun: singleRun,
    autoWatch: !singleRun
  }, done);
}

gulp.task('test', function(done) {
  runTests(true, done);
});

gulp.task('test:auto', function(done) {
  runTests(false, done);
});

gulp.task('default', ['clean'], function () {
  gulp.start('build');
});



gulp.task('default', ['build']);
