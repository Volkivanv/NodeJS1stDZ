# Ivan Volkov Math Package
Math functions

## using

```
//argument array
const xs = [1, 2, 3, 4, 5];
//function array
const ys = [9, 3, 6, 2, 4];
 
/
// get Y at arbitrary X
console.log(cSpline(xs, ys, 1.4));
 
// interpolate a line at a higher resolution
for (let i = 0; i <= 50; i++) {
  console.log(cSpline(xs, ys, i * 0.1));
}
```