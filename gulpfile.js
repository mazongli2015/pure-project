var gulp = require('gulp');
var rename = require('gulp-rename');
var webpack = require('webpack-stream');
var del = require('del');
var gls = require('gulp-live-server');

var runSequence = require('run-sequence');

gulp.task('clean',function(){
	del(['dist/**/*.js']);
});

gulp.task('serve', function() {
   //1. serve with default settings
   var server = gls.static(['dist','test','resuorces']); //equals to gls.static('public', 3000);
   server.start();

   //use gulp.watch to trigger server actions(notify, start or stop)
   gulp.watch(['resources/**', 'dist/**','test/**'], function (file) {
     server.notify.apply(server, [file]);
   });
 });

gulp.task('transpile',function(){
	return gulp.src('')
	.pipe(webpack(require('./webpack.config.js')))
	.pipe(gulp.dest('./dist'));
})

gulp.task('build',function(callback){
	runSequence('clean',['transpile'],callback)
})
