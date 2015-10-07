var gulp = require('gulp');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');

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
});

gulp.task('default', ['styles', 'fonts', 'watch']);