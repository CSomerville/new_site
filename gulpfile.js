var gulp = require('gulp');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

var production = (process.env.NODE_ENV === 'production')? true : false;

gulp.task('vendor', function(){
  return gulp.src([
    './assets/bower_components/jquery/dist/jquery.js'
  ])
    .pipe(concat('vendor.js'))
    .pipe(gulpif(production, uglify()))
    .pipe(gulp.dest('build/js'));
});

gulp.task('scripts', function(){
  return gulp.src('./assets/scripts/**/*.js')
    .pipe(concat('scripts.js'))
    .pipe(gulpif(production, uglify()))
    .pipe(gulp.dest('build/js'));
});

gulp.task('styles', function(){
  return gulp.src('./assets/styles/**/*.less')
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(gulp.dest('build/styles'));
});

gulp.task('fonts', function(){
  return gulp.src('./assets/devicons-master/fonts/**/*')
    .pipe(gulp.dest('build/fonts'))
});

gulp.task('watch', function(){
  gulp.watch('./assets/styles/**/*.less', ['styles']);
  gulp.watch('./assets/scripts/**/*.js', ['scripts']);
});

gulp.task('default', ['vendor', 'scripts', 'styles', 'fonts', 'watch']);