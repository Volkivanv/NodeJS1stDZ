const vIMathPackage = require('volkivanv_math_package');
const addResult = vIMathPackage.add(3,9);
const subResult = vIMathPackage.subtract(3,9);



console.log(addResult);
console.log(subResult);

//argument array
const xs = [1, 2, 3, 4, 5];
//function array
const ys = [9, 3, 6, 2, 4];
 
// get Y at arbitrary X
console.log(vIMathPackage.cSpline(xs, ys, 1.4));
 
// interpolate a line at a higher resolution
for (let i = 0; i <= 50; i++) {
  console.log(vIMathPackage.cSpline(xs, ys, i * 0.1));
}