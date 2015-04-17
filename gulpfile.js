var gulp = require("gulp");
var plumber = require("gulp-plumber");
var watch = require("gulp-watch");
var browserSync = require("browser-sync");

function arg(key) {
  var index = process.argv.indexOf(key);
  var next = process.argv[index + 1];

  if (index < 0) {
    return null;
  };

  return (!next || next[0] === "-") ? true : next;
};

gulp.task("default", function() {
  var browser = arg("--no-browser") || "default";

  browserSync({
    server: { baseDir: "./" },
    notify: false,
    browser: browser
  });

  watch("./**/*", { read: false }, function() {
    browserSync.reload();
  });
});