const spawn = require('child_process').spawn;
const path = require('path');
const gulp = require('gulp');

gulp.task('api', done => {
  process.env.api = 'on';
  process.env.tokenSecret = 'IcanHasCheezburger';
  require(path.join(__dirname, 'api', 'main'));
  //done();
});

gulp.task('auth', done => {
  process.env.auth = 'on';
  process.env.tokenSecret = 'IcanHasCheezburger';
  require(path.join(__dirname, 'auth', 'main'));
  //done();
});

gulp.task('firewall', done => {
  process.env.fw = 'on';
  process.env.tokenSecret = 'IcanHasCheezburger';
  require(path.join(__dirname, 'firewall', 'main'));
  //done();
});
