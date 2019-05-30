"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var server = require("browser-sync").create();
var rename = require("gulp-rename");
var posthtml = require("gulp-posthtml");
var del = require("del");
var htmlmin = require("gulp-htmlmin");
var jsmin = require("gulp-uglify");

gulp.task("clear", async function () {
  del("dist/**");
});

gulp.task("copyhtml", function () {
  return gulp.src(["app/*.html"],
  {
    base: "app"
  })
  .pipe(htmlmin({ collapseWhitespace: true }))
  .pipe(gulp.dest("dist"));
});

gulp.task("copyrest", function () {
  return gulp.src(["app/*.ico", "app/css/**", "app/img/**"],
  {
    base: "app"
  })
  .pipe(gulp.dest("dist"));
});

gulp.task("js", function () {
  return gulp.src(["app/js/**"],
   {
    base: "app"
  })
  .pipe(jsmin())
  .pipe(gulp.dest("dist"));
});


gulp.task("server", function () {
  server.init({
    server: "dist/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("app/js/**/*.js", gulp.series("js")).on("change", server.reload);
});

// gulp.task("images", function () {
//   return gulp.src("source/img/**/*.{jpg,png,svg}")
//     .pipe(imagemin([
//       imagemin.optipng({optimizationLevel: 3}),
//       imagemin.jpegtran({progressive: true}),
//       imageminMozjpeg(),
//       imagemin.svgo()
//     ]))
//     .pipe(gulp.dest("build/img"));
// });
//
// gulp.task("webp", function () {
//   return gulp.src("build/img/**/*.{jpg,png}")
//     .pipe(webp({quality: 90}))
//     .pipe(gulp.dest("build/img"));
// });
//
// gulp.task("sprite", function () {
//   return gulp.src("build/img/icon-*.svg")
//     .pipe(svgstore({
//       inlineSvg: true
//     }))
//     .pipe(rename("sprite.svg"))
//     .pipe(gulp.dest("build/img"));
// });

gulp.task("start", gulp.series("clear", "copyhtml", "copyrest", "server"));
// gulp.task("build", gulp.series("del", "html", "css", "js", "server"));
