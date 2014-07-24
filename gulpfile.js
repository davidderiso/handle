var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var paths = {
  scripts: ['client/lib/socket.io.min.js',
    'client/lib/easyrtc.js',
    'client/lib/angular/angular.min.js',
    'client/lib/angular-route/angular-route.min.js',
    'client/lib/underscore/underscore.js',
    'client/app/app.js',
    'client/app/app.controller.js',
    'client/components/services/auth_services.js',
    'client/components/services/easyrtc_services.js',
    'client/components/services/interview_services.js',
    'client/components/navbar/navbar.js',
    'client/app/home/home.js',
    'client/app/login/login.js',
    'client/app/signup/signup.js',
    'client/app/about/about.js',
    'client/app/lobby/lobby.js',
    'client/app/room/room.js'
    ]
};

gulp.task('default', function () {
  return gulp.src(paths.scripts)
    .pipe(uglify())
    .pipe(concat('built.min.js'))
    .pipe(gulp.dest('client'));
});
