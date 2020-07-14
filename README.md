# Redesign of snakesoftaiwan.com website
<br>

## Responsive image build process:

- add first part of page info to data.json
```
    "schoolTalksRespImgs": [{
    "nameLowerCaseHyphenated": "school-talks",
    "nameUpperCaseHyphenated": "School-talks",
    "name": "School talks",
    "maxWidthThumbs": "155",
    "maxHeightThumbs": "200",
    "aspectRatioClass": "130-59",
    "manyImagesId": "", # change to  manyImagesId": "\"id=\"swiper-pagination-many-images\"", if there are many images 
                        # pagination bottom changes on mobile (see swiperJsGallery.scss)
 
  
  }]

```

- Add original images to imgsToProcess file
- Name the images as follows:
  - 01.jpg
  - 02.jpg
  - ...
  - 10.jpg
  - 11.jpg

<br>

### Example using school talks page
#### Name images and get responsive image sizes info in json format   
- cd into imgsToProcess
- in resposive-img-sizes.py, change ```imgNamePrefix``` variable to species name or page name (first letter of the first word capitalized, hyphenated between words) 
- run ``` py responsive-img-sizes.py```
- The images will be renamed and json output for the responsive images will be printed in the terminal
- copy the output in terminal, add to data.json:
```
    "schoolTalksRespImgs": [{
    "nameLowerCaseHyphenated": "school-talks",
    "nameUpperCaseHyphenated": "School-talks",
    "name": "School talks",
    "maxWidthThumbs": "155",
    "maxHeightThumbs": "200",
    "aspectRatioClass": "130-59",
    "manyImagesId": "",

    "imgWidthsModal":
    [[375, 563, 650, 800, 1024, 1200], [375, 563, 650, 800], [375, 563, 650, 772], [375, 563, 650, 800], [375, 563, 650, 800], [375, 563, 600]],
    "imageHeightsModalMax":
    [[479], [537], [600], [537], [537], [800]],
    "imgWidthsNonModal":
    [[375, 563, 650], [375, 563, 650], [375, 563, 650], [375, 563, 650], [375, 563, 650], [375, 563, 600]],
    "imgHeightsNonModalMax":
    [[259], [436], [505], [436], [436], [800]]
  
  }]
```

<br>

#### Create all image variants using gulp-responsive-images
- cd ..

- add "imgWidthsModal": array to gulpfile.js (add it as var imagesToCreate) for images-swiper-gallery task
```
// school talks
var imagesToCreate = [[375, 563, 650, 800, 1024, 1200], [375, 563, 650, 800], [375, 563, 650, 772], [375, 563, 650, 800], [375, 563, 650, 800], [375, 563, 600]]
``` 
<br>

- cut and paste images from imgsToProcess folder to imgSrc folder

- run ```gulp images-swiper-gallery``` to create gallery and modal images
- run ```gulp images-swiper-gallery-thumbs``` to create thumbnail images
- cut and paste created images from imgDist to folder in dist/images named school-talks

<br>

- copy species-template-page.njk --> change name to school-talks.njk (in pages folder)
  (for Chinese pages use species-template-page_zh.njk)
- set Nunjucks variable (species) at the top to the name of the name/value pair in data.json

```{% set species = schoolTalksRespImgs %}```

- the following Nunjucks partials included in the template page will create the HTML for the Swiper galleries:

  ```
    {% include "partials/_swiper-responsive-images-modal.njk" %}
    {% include "partials/_swiper-responsive-images-nonModal.njk" %}
    {% include "partials/_swiper-responsive-images-thumbs.njk" %}
  ```
<br>

- add the required html below the included partials
- run ```gulp nunjucks```
- school-talks.html will be created and added to the dist folder

<br>

> also add school-talks.html to home.njk href attribute and to names": "href": ... in data.json for anchor links from nav search and home page, respectively.