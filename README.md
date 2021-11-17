# is-image-data
Functions for Identifying Image Data in Arbitrary Numerical Arrays

# install
```bash
npm install is-image-data
```

# usage
```js
import { isImageData, isRGB, isRGBA } from "is-image-data";
import calcImageStats from "calc-image-stats";

// array of RGBA values of 10x10 image
const data = [
   52,  70,  42, 255, 56,  72, 53, 255,  45,  60,  45, 255,
   37,  54,  30, 255, 62,  85, 48, 255,  70,  88,  53, 255,
   // ... 376 more items
];

const stats = calcImageStats(data, { height: 10, width: 10 });

// stats are
{
  bands: [
    { min: 9, max: 220, ... } // red band
    { min: 10, max: 212, ... }, // green band
    { min: 0, max: 209, ... }, // blue band
    { min: 255, max: 255, ... } // alpha band
  ],
  // ...
};

isRGBA({ stats });
// true

isRGB({ stats });
// false (because it has an A (alpha) band)

// checks if either isRGBA or isRGB is true
isImageData({ stats});
// true
```