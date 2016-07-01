const gulp = require('gulp');
const source = require('vinyl-source-stream');
const browserify = require('browserify');
const uglify = require('gulp-uglify');
const streamify = require('gulp-streamify');
const babel = require('gulp-babel');

//EI: rename your minified js to app.min.js, stick it in your public folder

gulp.task('browserify', function() {
    return browserify('./browser/app.js')
    	.transform("babelify", {presets: ["es2015"]})
  
        .bundle()
   
        .pipe( source( 'bundled.js' ) )
        .pipe( streamify( uglify().on('error', err => {
        	console.log(err);
        }) ) )
        .pipe( gulp.dest('minjs') );
});

gulp.watch('browser/**/*.js', ['browserify']);
// gulp.watch('js/*', ['browserify']);