# Created to change img file names from -1 ... -9  to -01 ... -09
# Because creating json output of responsive img sizes (responsive-img-sizes.py) for data.json will be incorrect
# if 10 or more images (processing order if 11 images...  -1 , -10, -11, -2, -3 ...)

import os, re

# match end of img file name (does not match where img number = 10 or more)
r = re.compile(r'-\d-\d\d\d(\d)?px(_2x)?(\.jpg|\.webp)')
# match to change (add '0' to the front it)
r2 = re.compile(r'\d-\d\d\d(\d)?px(_2x)?(\.jpg|\.webp)')

rootdir = os.getcwd()

for subdir, dirs, files in os.walk(rootdir):
    for filename in files:
        filepath = subdir + os.sep + filename

        if filename.endswith(('.jpg', '.webp')):
            mo = r.search(filename)
            mo2 = r2.search(filename)
            
            if mo:
                mText = mo2.group()
                os.rename(filepath, filepath.replace(mText, '0' + mText) )

