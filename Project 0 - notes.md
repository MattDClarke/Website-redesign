

# CS50 Web Programming - Project 0


## To do

- Make a modern, mobile version of snakesofTaiwan.com (simplified version, only a few snakes)


## Steps

- [x] Make general index homepage layout with Grid, Flexbox and Bootstrap

- [x] make images responsive

- [x] crop images with CSS object-fit?

- [x] style

- [x] drop-down: adjust width of search input and lang input

- [x] make images responsive when hovered over (move a bit or incr. in size)

- [x] Make sure footer sticks to bottom using Grid or Flexbox (check my I & T Downloader project)

- [x] Make nav list items align when size is small and have font awesome images align

- [x] Nav items alignment is not ideal.... not aligned with content...left align? then right align search bar? Try make .navbar-items-container (flex container) span the viewport width and then make nav layout more evenly spaced...

- [x] Nav margins when screen size big...

- [x] menu icon color...change to white...

- [x] Add venomous icons - background - scull and crossbones, with some transparency??

- [x] active page - underline text?

- [x] Make snakes gallery filterable - https://www.w3schools.com/howto/howto_js_portfolio_filter.asp

- [x] Make mobile responsive...change grid-card size for mobile using an image query later.... (smaller....)

- [x] Make css neater, inherit properties... like in lecture add sass properties

- [x] Add filter: Taipei, common

- [x] Filtering ... filter without making images display none when Javascript turned off...  see ladies article --> ignore for now...

- [x] Nunjucks - templating language --> add to file, use because it is like Jinja2

- [x] filtering: add  mildly venomous

- [x] add all species for cards

- [x] add alt="  " for images

- [x] correctly orient images in cards... x-axis --> add to njk file

- [x] correctly orient images in cards... y-axis --> add to njk file

- [x] check images in mobile form

- [x] make about.html text responsive

  make some link pages for the snake species - example pages, one species, one about, one links, ....

- [x] about page

  school talks

  

  

- [x] make images same size

- [x] make carosel

- [x] make carousel go back to start if right arrow clicked on last image (and do same for start image and left arrow).  For loop --> reset current slide = 0 and current dot = 0 if left arrow  clicked when image = current  image = image array.length

- [x] make carousel responsive

- [x] book - make img next to text (desktop size) and text below img (tablet/ mobile size) --> FlexBox (need to change .about-box  width...)

- [x] Links - check that nav links icon works

- [ ] Links - th Incr padding and make text larger

- [ ] One snake - first one

- [ ] check that search works

- [ ] fix Chinese language icon - edit it...make it unique

- [ ] make javascript files only load for the pages they are needed for? e.g. only add gallery-filter.js to index.njk?

- [ ] prevent nav and footer from reloading after changing page...async js?

- [ ] check HTML and CSS (w3 validator)

- [ ] accessibility --> no JS fallback

- [ ] look at again - improve design? more white space?

- [ ] Check that I met requirements of CS50 project (I can add links in a table... write README...)

- [ ] After submitting, if it looks good... suggest a site update to Hans Breuer?  



## Requirements

- Your website must contain at least four different `.html` pages, and it should be possible to get from any page on your website to any other page by following one or more hyperlinks.

- Your website must include at least one list (ordered or unordered), at least one table, and at least one image.

- Your website must have at least one stylesheet file.

- Your stylesheet(s) must use at least five different CSS properties, and at least five different types of CSS selectors. You must use the `#id` selector at least once, and the `.class` selector at least once.

- Your stylesheet(s) must include at least one mobile-responsive `@media` query, such that something about the styling changes for smaller screens.

- You must use Bootstrap 4 on your website, taking advantage of at least one Bootstrap [component](https://getbootstrap.com/docs/4.3/components/), and using at least two Bootstrap columns for layout purposes using Bootstrap’s [grid model](https://getbootstrap.com/docs/4.3/layout/grid/).

- Your stylesheets must use at least one SCSS variable, at least one example of SCSS nesting, and at least one use of SCSS inheritance.

- In `README.md`, include a short writeup describing your project, what’s contained in each file, and (optionally) any other additional information the staff should know about your project.

  

## How to Submit

1. Visit [this link](https://submit.cs50.io/invites/89679428401548238ceb022f141b9947), log in with your GitHub account, and click **Authorize cs50**. Then, check the box indicating that you’d like to grant course staff access to your submissions, and click **Join course**.

2. [Install Git](https://git-scm.com/downloads) and, optionally, [install `submit50`](https://cs50.readthedocs.io/submit50/).

3. If you’ve installed

    

   ```
   submit50
   ```

   , execute

   ```
   submit50 web50/projects/2020/x/0
   ```

   Otherwise, using Git, push your work to `https://github.com/me50/USERNAME.git`, where `USERNAME` is your GitHub username, on a branch called `web50/projects/2020/x/0`.

4. [Record a 1- to 5-minute screencast](https://www.howtogeek.com/205742/how-to-record-your-windows-mac-linux-android-or-ios-screen/) in which you demonstrate your app’s functionality and/or walk viewers through your code. [Upload that video to YouTube](https://www.youtube.com/upload) (as unlisted or public, but not private) or somewhere else.

5. [Submit this form](https://forms.cs50.io/c5ccb746-cc89-48c6-8a69-c3c12ff3a844).

You can then go to https://cs50.me/cs50w to view your current progress!





### What I learned

- Nunjucks --> populating HTML with data (data.json). Decided not to use as the image cards vary alot... learn at a later stage when I am more comfortable with JavaScript



### Silly errors

> Small errors that took long to fix

- Nunjucks and Gulp

  - duplicate gulp.js and .njk files caused errors

  - In _layouts.njk I left out " " which caused a template render error...

    ```{% include partials/_footer.njk %}```

    Should have been ```{% include "partials/_footer.njk" %}```

- I made the index.html page thumbnails large images.... loads slowly... need to redo using small images...

### Future improvements

- Make no JavaScript/ no CSS fallback