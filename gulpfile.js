///////////////  convert .njk to .html and adding data from data.json to .njk ///////////////

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
	.pipe(gulp.dest('./dist'))
  });

var data = require('gulp-data');
gulp.task('nunjucks', function() {
return gulp.src('./pages/**/*.+(html|njk)')
	// Adding data to Nunjucks
	.pipe(data(function() {
	return require('./data.json')
	}))
	.pipe(nunjucksRender({
	path: ['./templates']
	}))
	.pipe(gulp.dest('./dist'))
});

const newLocal = 'nunjucks';
gulp.task('watch', function(){	
	gulp.watch('./pages/**/*.njk', gulp.series('nunjucks'));	 
	gulp.watch('./templates/**/*.njk', gulp.series('nunjucks'));	 
});



///////////////////////////////  creating different sized images //////////////////////////////

// image resizing, compression, changing format (.jpg and .webp) and sharpening down sized images
// for snakesoftaiwan.com pages
// 1. book.html - fixed size images - uses srcset pixel density descriptors  
// 2. index.html - responsive size images - uses srcset width descriptors  
// 3. home.html - fixed size images - uses srcset pixel density descriptors  
// 4. swiper gallery - responsive size images - uses src set width descriptors
// 5. swiper gallery thumbs - responsive size images for thumbs only 
// * check task names to call specific task

var gulp = require('gulp')
var $ = require('gulp-load-plugins')()



/////////////////////////////////////////////////// 1. book.html //////////////////////////////////////////////////////////

gulp.task('images-books', function () {
  return gulp
    .src('imgSrc/*.jpg')
    .pipe(
      $.responsive(
        {
          '*.jpg': [
            {
              width: 200,
              rename: {
                suffix: '-200px',
                extname: '.jpg'
              },
              format: 'jpg'
            },

            {
              width: 200 * 2,   /* for retina displays... higher pixel density */
              rename: {
                  suffix: '-200px_2x',
                  extname: '.jpg'
              },
            },

            {
              width: 200 * 3,   /* for retina displays... higher pixel density */
              rename: {
                  suffix: '-200px_3x',
                  extname: '.jpg'
              },
            },
                
            {
              width: 280,
              rename: {
                suffix: '-280px',
                extname: '.jpg'
              },
              // format option can be omitted because
              // format of output image is detected from the new filename (extname)
              // format: 'jpg'
            },
            {         
              width: 280 * 2,
              rename: {
                suffix: '-280px_2x',
                extname: '.jpg'
              }
            },
            {
              width: 280 * 3,
              rename: {
                suffix: '-280px_3x',
                extname: '.jpg'
              }
            },


            {
              // Convert images to the webp format
              width: 200,
              rename: {
                suffix: '-200px',
                extname: '.webp'
              }
            },
            {
                // Convert images to the webp format
                width: 200 * 2,
                rename: {
                  suffix: '-200px_2x',
                  extname: '.webp'
                }
              },
              {
                // Convert images to the webp format
                width: 200 * 3,
                rename: {
                  suffix: '-200px_3x',
                  extname: '.webp'
                }
              },
            {
                // Convert images to the webp format
                width: 280,
                rename: {
                  suffix: '-280px',
                  extname: '.webp'
                }
              },
              {
                // Convert images to the webp format
                width: 280 * 2,
                rename: {
                  suffix: '-280px_2x',
                  extname: '.webp'
                }
              },
              {
                // Convert images to the webp format
                width: 280 * 3,
                rename: {
                  suffix: '-280px_3x',
                  extname: '.webp'
                }
              }
          ]
        },
        {
          // Global configuration for all images
          // The output quality for JPEG, WebP output formats
          quality: 80,
          sharpen: {sigma: 1, radius: 2}, 
          filter: 'Catrom', // good for when down sizing image - https://www.npmjs.com/package/gulp-image-resize/v/0.13.1
          // Use progressive (interlace) scan for JPEG and PNG output
          progressive: true,
          // Strip all metadata
          withMetadata: false,
          // Do not emit the error when image is enlarged.
          errorOnEnlargement: false
        }
      )
    )
    .pipe(gulp.dest('imgDist'))
})


/////////////////////////////////////////////////// 2. index.html //////////////////////////////////////////////////////////

gulp.task('images-index', function () {
  return gulp
    .src('imgSrc/*.jpg')
    .pipe(
      $.responsive(
        {
          '*.jpg': [
            {
              width: 375,
              rename: {
                suffix: '-375px',
                extname: '.jpg'
              },
            },
         
            {
              width: 500,
              rename: {
                suffix: '-500px',
                extname: '.jpg'
              },
              // format option can be omitted because
              // format of output image is detected from the new filename (extname)
              // format: 'jpg'
            },


            {
              // Convert images to the webp format
              width: 375,
              rename: {
                suffix: '-375px',
                extname: '.webp'
              }
            },

            {
              // Convert images to the webp format
              width: 500,
              rename: {
                suffix: '-500px',
                extname: '.webp'
              }
            }
          ]
        },
        {
          // Global configuration for all images
          // The output quality for JPEG, WebP output formats
          quality: 80,
          sharpen: {sigma: 1, radius: 2}, 
          filter: 'Catrom', // good for when down sizing image - https://www.npmjs.com/package/gulp-image-resize/v/0.13.1
          // Use progressive (interlace) scan for JPEG and PNG output
          progressive: true,
          // Strip all metadata
          withMetadata: false,
          // Do not emit the error when image is enlarged.
          errorOnEnlargement: false
        }
      )
    )
    .pipe(gulp.dest('imgDist'))
})


/////////////////////////////////////////////////// 3. home.html //////////////////////////////////////////////////////////
// resize based on img height... (height of img in card... and hover zoom = 1.2)
// smallest height of source images = 428px... therefore 3x pixel density not useful foor all images... (200 * 3 > 428) 

gulp.task('images-home', function () {
  return gulp
    .src('imgSrc/*.jpg')
    .pipe(
      $.responsive(
        {
          '*.jpg': [
            {
              height: 200,
              rename: {
                suffix: '-h-200px',
                extname: '.jpg'
              },
              format: 'jpg'
            },

            {
              height: 200 * 2,   /* for retina displays... higher pixel density */
              rename: {
                  suffix: '-h-200px_2x',
                  extname: '.jpg'
              },
            },
                
            {
              height: 140,
              rename: {
                suffix: '-h-140px',
                extname: '.jpg'
              },
              // format option can be omitted because
              // format of output image is detected from the new filename (extname)
              // format: 'jpg'
            },
            {         
              height: 140 * 2,
              rename: {
                suffix: '-h-140px_2x',
                extname: '.jpg'
              }
            },


            {
              // Convert images to the webp format
              height: 200,
              rename: {
                suffix: '-h-200px',
                extname: '.webp'
              }
            },
            {
                // Convert images to the webp format
                height: 200 * 2,
                rename: {
                  suffix: '-h-200px_2x',
                  extname: '.webp'
                }
              },

            {
                // Convert images to the webp format
                height: 140,
                rename: {
                  suffix: '-h-140px',
                  extname: '.webp'
                }
              },
              {
                // Convert images to the webp format
                height: 140 * 2,
                rename: {
                  suffix: '-h-140px_2x',
                  extname: '.webp'
                }
              }

          ]
        },
        {
          // Global configuration for all images
          // The output quality for JPEG, WebP output formats
          quality: 80,
          sharpen: {sigma: 1, radius: 2}, 
          filter: 'Catrom', // good for when down sizing image - https://www.npmjs.com/package/gulp-image-resize/v/0.13.1
          // Use progressive (interlace) scan for JPEG and PNG output
          progressive: true,
          // Strip all metadata
          withMetadata: false,
          // Do not emit the error when image is enlarged.
          errorOnEnlargement: false
        }
      )
    )
    .pipe(gulp.dest('imgDist'))
})


/////////////////////////////////////////////////// 4. swiper gallery //////////////////////////////////////////////////////////
// images to create for school talks (created using responsive-img-sizes.py and stored in data.json)
// EXCLUDING thumbnail images ... create using: gulp images-swiper-gallery-thumbs
// Array of arrays from "imgWidthsModal": ... in data.json
// species name - lowercase and hyphenated between words
var speciesName = 'deinagkistrodon-acutus'
var imagesToCreate = [[375, 563, 650, 800, 1024], [375, 563, 650, 800, 1024], [375, 563, 650, 800, 1024], [375, 563, 650, 800], [375, 563, 650, 800, 1024], [375, 563, 
  650, 800, 1024], [375, 563, 650, 800, 1024], [375, 563, 650, 800, 1024], [375, 563, 650, 800], [375, 563, 650, 800, 1024], [375, 563, 650, 800, 1024], [375, 563, 650, 661], [375, 563, 650, 800], [375, 563, 650, 800, 1024], [375, 563, 650, 681]]


// loop through each image set and create correct images for each img

gulp.task('images-swiper-gallery', function (respImages) {
  for (let i = 0; i < imagesToCreate.length; i++) {
    let count = i + 1;
    const imageSet = imagesToCreate[i];
    console.log(`Image set ${i}, ${imageSet}`);

    for (let j = 0; j < imageSet.length; j++) {
      console.log(`Width of image ${imageSet[j]}`);
      
      let countString = count.toString();
      let srcText = 'imgSrc/*' + countString + '.jpg';
        gulp.src(srcText)
        .pipe(
          $.responsive(
            {
              '*.jpg': [
                {
                  width: imageSet[j], 
                  rename: {
                    suffix: `-${imageSet[j]}px`,
                    extname: '.jpg'
                  },
                },
          
                // Convert images to webp format 
                {
                  width: imageSet[j], 
                  rename: {
                    suffix: `-${imageSet[j]}px`,
                    extname: '.webp'
                  },
                },
              ]
            },
            {
              // Global configuration for all images
              // The output quality for JPEG, WebP output formats
              quality: 80,
              sharpen: {sigma: 1, radius: 2}, 
              filter: 'Catrom', // good for when down sizing image - https://www.npmjs.com/package/gulp-image-resize/v/0.13.1
              // Use progressive (interlace) scan for JPEG and PNG output
              progressive: true,
              // Strip all metadata
              withMetadata: false,
              // Do not emit the error when image is enlarged.
              errorOnEnlargement: false
            }
          )
        )
        .pipe(gulp.dest(`dist/images/${speciesName}`))
    }
  }
  respImages();
  return gulp
  
})







/////////////////////////////////////////////////// 5. swiper gallery thumbs //////////////////////////////////////////////////////////
gulp.task('images-swiper-gallery-thumbs', function () {
  return gulp
    .src('imgSrc/*.jpg')
    .pipe(
      $.responsive(
        {
          '*.jpg': [
            {
              width: 155, // for thumbnail img
              rename: {
                suffix: '-155px',
                extname: '.jpg'
              },
            },
            {
              width: 155 * 2,   
              rename: {
                suffix: '-155px_2x',
                extname: '.jpg'
              },
            },

			
            // Convert images to the webp format 
            {
              width: 155, // for thumbnail img
              rename: {
                suffix: '-155px',
                extname: '.webp'
              },
            },
            {
              width: 155 * 2,   
              rename: {
                suffix: '-155px_2x',
                extname: '.webp'
              },
            }

          ]
        },
        {
          // Global configuration for all images
          // The output quality for JPEG, WebP output formats
          quality: 80,
          sharpen: {sigma: 1, radius: 2}, 
          filter: 'Catrom', // good for when down sizing image - https://www.npmjs.com/package/gulp-image-resize/v/0.13.1
          // Use progressive (interlace) scan for JPEG and PNG output
          progressive: true,
          // Strip all metadata
          withMetadata: false,
          // Do not emit the error when image is enlarged.
          errorOnEnlargement: false
        }
      )
    )
    .pipe(gulp.dest(`dist/images/${speciesName}`))
})









// ORIGINAL images-swiper-gallery TASK CODE (NO LOOPS)
// /////////////////////////////////////////////////// 4. swiper gallery //////////////////////////////////////////////////////////
// // make sure all images min width = 650px
// gulp.task('images-swiper-gallery', function () {
//   return gulp
//     .src('imgSrc/*.jpg')
//     .pipe(
//       $.responsive(
//         {
//           '*.jpg': [
//             {
//               width: 155, // for thumbnail img
//               rename: {
//                 suffix: '-155px',
//                 extname: '.jpg'
//               },
//             },
//             {
//               width: 155 * 2,   
//               rename: {
//                 suffix: '-155px_2x',
//                 extname: '.jpg'
//               },
//             },
//             {
//               width: 375,
//               rename: {
//                 suffix: '-375px',
//                 extname: '.jpg'
//               },
//             },
//             {
//               width: 563,
//               rename: {
//                 suffix: '-563px',
//                 extname: '.jpg'
//               },
//             },         
//             {
//               width: 650,
//               rename: {
//                 suffix: '-650px',
//                 extname: '.jpg'
//               },
//             },
//             {
//               width: 800,
//               rename: {
//                 suffix: '-800px',
//                 extname: '.jpg'
//               },
//             }, 
//             {
//               width: 1200,
//               rename: {
//                 suffix: '-1200px',
//                 extname: '.jpg'
//               },
// 			      }, 
			
//               // Convert images to the webp format 
//               {
//                 width: 155, // for thumbnail img
//                 rename: {
//                   suffix: '-155px',
//                   extname: '.webp'
//                 },
//               },
//               {
//                 width: 155 * 2,   
//                 rename: {
//                   suffix: '-155px_2x',
//                   extname: '.webp'
//                 },
//               },

//             {
//               width: 375,
//               rename: {
//                 suffix: '-375px',
//                 extname: '.webp'
//               }
//             },

//             {
//               // Convert images to the webp format
//               width: 563,
//               rename: {
//                 suffix: '-563px',
//                 extname: '.webp'
//               }
//             },
//             {
//               width: 650,
//               rename: {
//                 suffix: '-650px',
//                 extname: '.webp'
//               },
//             },
//             {
//               width: 800,
//               rename: {
//                 suffix: '-800px',
//                 extname: '.webp'
//               },
//             },
//             {
//               width: 1200,
//               rename: {
//                 suffix: '-1200px',
//                 extname: '.webp'
//               },
//             } 
//           ]
//         },
//         {
//           // Global configuration for all images
//           // The output quality for JPEG, WebP output formats
//           quality: 80,
//           sharpen: {sigma: 1, radius: 2}, 
//           filter: 'Catrom', // good for when down sizing image - https://www.npmjs.com/package/gulp-image-resize/v/0.13.1
//           // Use progressive (interlace) scan for JPEG and PNG output
//           progressive: true,
//           // Strip all metadata
//           withMetadata: false,
//           // Do not emit the error when image is enlarged.
//           errorOnEnlargement: false
//         }
//       )
//     )
//     .pipe(gulp.dest('imgDist'))
// })