// Brad Traversy tutorial https://www.youtube.com/watch?v=4YQ4svkETS0 
var i = 0; // count variable
var images = []; // images array
var time = 2000; // time btn switching in millisecs

// image list
images[0] = "images-school-talks/Bali Guoxiao091214-Class1B_1.jpg";
images[1] = "images-school-talks/SnakeTalk-Hengshan091119_12.jpg";
images[2] = "images-school-talks/SnakeTalk-Hengshan091119_12.jpg";
images[3] = "images-school-talks/SnakeTalkHsinhua100115_02.jpg";
images[4] = "images-school-talks/SnakeTalkHsinhua100115_03.jpg";
images[5] = "images-school-talks/SnakeTalkHsinhua100115_03.jpg";

// change image
function changeImg() {
    document.slide.src = images[i]; // get src of img with name="slide"

    // check if index is under maximum
    if(i < images.length -1) {
        i++;
    } else {
        // reset i
        i = 0;
    }

    // run function every x seconds
    setTimeout("changeImg()", time);
}

// Run function when page loads
window.onload=changeImg;