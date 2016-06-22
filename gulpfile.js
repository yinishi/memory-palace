const gulp = require('gulp');
const source = require('vinyl-source-stream');
const browserify = require('browserify');
const uglify = require('gulp-uglify');
const streamify = require('gulp-streamify');
const babel = require('gulp-babel');

gulp.task('browserify', function() {
    return browserify('./js/index.js')
    	.transform("babelify", {presets: ["es2015"]})
  
        .bundle()
   
        .pipe( source( 'bundled.js' ) )
        .pipe( streamify( uglify().on('error', err => {
        	console.log(err);
        }) ) )
        .pipe( gulp.dest('minjs') );
});

gulp.watch('js/*', ['browserify']);
