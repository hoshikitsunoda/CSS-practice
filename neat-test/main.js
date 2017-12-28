var gulp  = require('gulp'),
  sass  = require('gulp-sass'),
  connect = require('gulp-connect'),

  sassOptions={
    src: 'sass/styles.scss',
    destDir: 'out/css/'
  };

gulp.task('sass',function(){
  gulp.src(sassOptions.src)
    .pipe(sass({
      errLogToConsole: true,
      includePaths: require('node-neat').includePaths
    }))
    .pipe(gulp.dest(sassOptions.destDir));
});

gulp.task('connect', function() {
  connect.server({
    root: 'out'
  });
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(sassOptions.src, ['sass']);
});


gulp.task('default',['sass', 'connect', 'watch']);
