# Redesign of snakesoftaiwan.com website
<br>

## Responsive image build process:

- add first part of page info to data.json
```
  "fowleaFlavipuncatusRespImgs": [{
    "nameLowerCaseHyphenated": "fowlea-flavipuncatus",
    "nameUpperCaseHyphenated": "Fowlea-flavipuncatus",
    "name": "Fowlea flavipuncatus",
    "commonName": "Checkered Keelback",
    "chineseName": "草 花蛇",
    "chineseNameRomanized": "(cao3hua1she2)",
    "status": "Status: Not Protected",
    "statusChinese": "保育等級: 非保育類",
    "danger": "Non-venomous",
    "dangerChinese": "無毒",
    "maxWidthThumbs": "155",
    "maxHeightThumbs": "200",
    "aspectRatioClass": "325-226",
    "manyImagesId": "",

  }],

```

- Add original images to imgsToProcess file
- Name the images as follows:
  - 01.jpg
  - 02.jpg
  - ...
  - 10.jpg
  - 11.jpg

> Make sure images are .jpg  (lowercase)

<br>

### Example using Fowlea flavipuncatus page
#### Name images and get responsive image sizes info in json format   
- cd into imgSrc
- in resposive-img-sizes.py, change ```imgNamePrefix``` variable to species name or page name (first letter of the first word capitalized, hyphenated between words) 
- run ```py responsive-img-sizes.py```
- The images will be renamed and json output for the responsive images will be printed in the terminal
- copy the output in terminal, add to data.json:
```
  "fowleaFlavipuncatusRespImgs": [{
    "nameLowerCaseHyphenated": "fowlea-flavipuncatus",
    "nameUpperCaseHyphenated": "Fowlea-flavipuncatus",
    "name": "Fowlea flavipuncatus",
    "commonName": "Checkered Keelback",
    "chineseName": "草 花蛇",
    "chineseNameRomanized": "(cao3hua1she2)",
    "status": "Status: Not Protected",
    "statusChinese": "保育等級: 非保育類",
    "danger": "Non-venomous",
    "dangerChinese": "無毒",
    "maxWidthThumbs": "155",
    "maxHeightThumbs": "200",
    "aspectRatioClass": "325-226",
    "manyImagesId": "",
    "imgWidthsModal": 
    [[375, 563, 650, 800, 1024, 1280, 1824], [375, 563, 650, 768], [375, 563, 650, 800], [375, 563, 650, 800, 1024], [375, 563, 650, 800, 952], [375, 
    563, 650, 800, 1024], [375, 563, 650, 800, 847]],
    "imageHeightsModalMax":
    [[1187], [919], [600], [768], [768], [683], [768]],
    "imgWidthsNonModal":
    [[375, 563, 650], [375, 563, 650], [375, 563, 650], [375, 563, 650], [375, 563, 650], [375, 563, 650], [375, 563, 650]],
    "imgHeightsNonModalMax":
    [[422], [777], [487], [487], [524], [433], [589]]
  }],
```

<br>

#### Create all image variants using gulp-responsive-images
- cd ..
- add "imgWidthsModal": array to gulpfile.js (add it as var imagesToCreate) for images-swiper-gallery task
- add species name (lowercase, hyphenated) to gulpfile.js (add it as var speciesName)
```
var speciesName = 'fowlea-flavipuncatus'
var imagesToCreate = [[375, 563, 650, 800, 1024, 1280, 1824], [375, 563, 650, 768], [375, 563, 650, 800], [375, 563, 650, 800, 1024], [375, 563, 650, 800, 952], [375, 
  563, 650, 800, 1024], [375, 563, 650, 800, 847]]
``` 
<br>

- run ```gulp images-swiper-gallery``` to create gallery and modal images
- run ```gulp images-swiper-gallery-thumbs``` to create thumbnail images
- the images will be saved to dist/images/{species name}
> The subfolders will be created if they do not exist 

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