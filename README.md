# Redesign of snakesoftaiwan.com website

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
- Name and number, for example:
  - Trimeresurus-stejnegeri-stejnegeri-01.jpg
  - Trimeresurus-stejnegeri-stejnegeri-02.jpg
  - ...
  - Trimeresurus-stejnegeri-stejnegeri-10.jpg
  - Trimeresurus-stejnegeri-stejnegeri-11.jpg
  
  or 

  - School-talks-01.jpg
  - School-talks-02.jpg
  - ...
  - School-talks-10.jpg
  - School-talks-11.jpg



> example using school talks page

- cd into imgsToProcess
- run ``` py resposive-img-sizes.py```
- copy output in console, add to data.json,
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
- add "imgWidthsModal": array to gulpfile.js (add it as var imagesToCreate) for images-swiper-gallery task
```
// school talks
var imagesToCreate = [[375, 563, 650, 800, 1024, 1200], [375, 563, 650, 800], [375, 563, 650, 772], [375, 563, 650, 800], [375, 563, 650, 800], [375, 563, 600]]
``` 
- cd ..
- cut and paste images from imgsToProcess folder to imgSrc folder
- run ```gulp images-swiper-gallery``` to create gallery and modal images
- run ```images-swiper-gallery-thumbs``` to create thumbnail images
- cut and paste created images from imgDist to folder in dist/images named school-talks


- copy species-template-page.njk --> change name to school-talks.njk (in pages folder)
- set Nunjucks variable (species) at the top to the name of the name/value pair in data.json
```{% set species = schoolTalksRespImgs %}```
- the following Nunjucks partials included in the template page will create the HTML for the Swiper galleries:
  ```
    {% include "partials/_swiper-responsive-images-modal.njk" %}
    {% include "partials/_swiper-responsive-images-nonModal.njk" %}
    {% include "partials/_swiper-responsive-images-thumbs.njk" %}
  ```

- add the required html below the included partials
- run ```gulp nunjucks```
- school-talks.html will be created and added to the dist folder

> also add school-talks.html to home.njk href attribute and to names": "href": ... in data.json for anchor links from nav search and home page, respectively.