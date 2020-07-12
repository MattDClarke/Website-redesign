# create .json output for responsive images (widths and heights) (responsive images made using gulp)
# need to CD into imgsToProcess directory
import os
from PIL import Image



# Loop over all files in the working directory.
imgWidthsModal = []
for filename in os.listdir('.'): # current directory
    if not (filename.endswith('.jpg')):
        continue # skip python file

    im = Image.open(filename)
    w, h = im.size  # tuple

    # image sizes used depends on the max with of the original image
    if (w > 1024 ):
        imageSizes = [375, 563, 650, 800, 1024]
        imageSizes.append(w)
    elif (w == 1024 ):
        imageSizes = [375, 563, 650, 800, 1024]
    elif ( 800 < w < 1024 ):
        imageSizes = [375, 563, 650, 800]
        imageSizes.append(w)
    elif ( w == 800 ):
        imageSizes = [375, 563, 650, 800]
    elif ( 650 < w < 800 ):
        imageSizes = [375, 563, 650]
        imageSizes.append(w)
    elif ( w == 650 ):
        imageSizes = [375, 563, 650]
    elif ( 563 < w < 650 ):
        imageSizes = [375, 563]
        imageSizes.append(w)

    imgWidthsModal.append(imageSizes)

imgWidthsModalOutput = '"imgWidthsModal": \n' + str(imgWidthsModal) 



imageHeightsModalMax = []
for filename in os.listdir('.'):
    if not (filename.endswith('.jpg')):
        continue # skip python file

    im = Image.open(filename)
    w, h = im.size
    maxHeight =[]
    maxHeight.append(h)
    imageHeightsModalMax.append(maxHeight)

imageHeightsModalMaxOutput = '"imageHeightsModalMax": \n' + str(imageHeightsModalMax) 



# Loop over all files in the working directory.
imgWidthsNonModal = []
for filename in os.listdir('.'):
    if not (filename.endswith('.jpg')):
        continue # skip python file

    im = Image.open(filename)
    w, h = im.size  

    if (w >= 650 ):
        imageSizes = [375, 563, 650]
    elif ( 563 < w < 650 ):
        imageSizes = [375, 563]
        imageSizes.append(w)
    elif ( w == 563 ):
        imageSizes = [375, 563]
    elif ( 375 < w < 563 ):
        imageSizes = [375]
        imageSizes.append(w)

    imgWidthsNonModal.append(imageSizes)

imgWidthsNonModalOutput = '"imgWidthsNonModal": \n' + str(imgWidthsNonModal)



imgHeightsNonModalMax = []
for filename in os.listdir('.'):
    if not (filename.endswith('.jpg')):
        continue # skip python file

    im = Image.open(filename)
    w, h = im.size
    maxHeight =[]
    if (w >= 650 ):
        # calculate max height of image that is 650px wide
        heightCalculated = int(650 / w * h)
        maxHeight.append(heightCalculated)
    elif ( w < 650 ):
        maxHeight.append(h)

    imgHeightsNonModalMax.append(maxHeight)

imgHeightsNonModalMaxOutput = '"imgHeightsNonModalMax": \n' + str(imgHeightsNonModalMax) 



# join all the img size arrays together
responsiveImgSizesAll = imgWidthsModalOutput + ', \n' + imageHeightsModalMaxOutput + ', \n' +  imgWidthsNonModalOutput + ', \n' +  imgHeightsNonModalMaxOutput
print(responsiveImgSizesAll)