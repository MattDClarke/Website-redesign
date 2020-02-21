var gulp = require('gulp'); 
var nunjucksRender = require('gulp-nunjucks-render');

gulp.task('nunjucks', function() {
	const newLocal = 'root';
	// Gets .html and .nunjucks files in pages
	return gulp.src('./pages/**/*.+(html|njk)')
	// Renders template with nunjucks
	.pipe(nunjucksRender({
		path: ['./templates']
	  }))
	// output files in folder
	.pipe(gulp.dest('./'))
  });

// var data = require('gulp-data');
// gulp.task('nunjucks', function() {
// return gulp.src('./pages/**/*.+(html|njk)')
// 	// Adding data to Nunjucks
// 	.pipe(data(function() {
// 	return require('./data.json')
// 	}))
// 	.pipe(nunjucksRender({
// 	path: ['./templates']
// 	}))
// 	.pipe(gulp.dest('./html'))
// });

const newLocal = 'nunjucks';
gulp.task('watch', function(){	
	gulp.watch('./pages/**/*.njk', gulp.series('nunjucks'));
	gulp.watch('./templates/**/*.njk', gulp.series('nunjucks'));	 
});