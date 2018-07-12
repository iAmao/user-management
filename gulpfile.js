const gulp = require('gulp');
const babel = require('gulp-babel');
 
gulp.task('build-src', () =>
    gulp.src('src/**/*.js')
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(gulp.dest('dist/src'))
);

gulp.task('build-lib', () =>
    gulp.src('lib/*.js')
    .pipe(babel({
        presets: ['env']
     }))
    .pipe(gulp.dest('dist/lib')))

gulp.task('build-knex', () =>
    gulp.src('knexfile.js')
    .pipe(babel({
        presets: ['env']
     }))
    .pipe(gulp.dest('dist/')))

gulp.task('default', ['build-src', 'build-lib', 'build-knex'])
