function add(x, y) {
  return x + y;
}

function subtract(x, y) {
  return x - y;
}

const sqr = (number) => number ** 2;


function cSpline(xArray, yArray, x) {
  const n = Math.min(xArray.length, yArray.length) - 1;
  const a = yArray;
  let h = new Array(n + 1).fill(0);
  for (let k = 1; k <= n; k++) {
    h[k] = xArray[k] - xArray[k - 1];
  }
  let l = new Array(n + 1).fill(0);
  for (let k = 1; k <= n; k++) {
    l[k] = (yArray[k] - yArray[k - 1]) / h[k];
  }
  let c = new Array(n + 1).fill(0);
  c[0] = 0;
  c[n] = 0;
  let delta = new Array(n + 1).fill(0);
  delta[1] = -h[2] / (2 * (h[1] + h[2]));
  let lambda = new Array(n + 1).fill(0);
  lambda[1] = (3 * (l[2] - l[1])) / (2 * (h[1] + h[2]));
  for (let k = 3; k <= n; k++) {
    delta[k - 1] = -h[k] / (2 * h[k - 1] + 2 * h[k] + h[k - 1] + h[k - 1] * delta[k - 2]);
    lambda[k - 1] =
      (3 * l[k] - 3 * l[k - 1] - h[k - 1] * lambda[k - 2]) / (2 * h[k - 1] + 2 * h[k] + h[k - 1] * delta[k - 2]);
  }
  for (let k = n; k >= 2; k--) {
    c[k - 1] = delta[k - 1] * c[k] + lambda[k - 1];
  }
  let b = new Array(n + 1).fill(0);
  let d = new Array(n + 1).fill(0);
  for (let k = 1; k <= n; k++) {
    b[k] = l[k] + (2 * c[k] * h[k] + h[k] * c[k - 1]) / 3;
    d[k] = (c[k] - c[k - 1]) / (3 * h[k]);
  }
  //выпадение за левый край
  if((xArray[1] > xArray[0] && x <= xArray[0]) || (xArray[1] < xArray[0] && x >= xArray[0])) {
    return a[1] + b[1] * (x - xArray[1]) + c[1] * sqr(x - xArray[1]) + d[1] * sqr(x - xArray[1]) * (x - xArray[1]);
  }
  //выпадение за правый край
  if((xArray[n] > xArray[n - 1] && x >= xArray[n]) || (xArray[n] < xArray[n - 1] && x <= xArray[n])) {
    return a[n] + b[n] * (x - xArray[n]) + c[n] * sqr(x - xArray[n]) + d[n] * sqr(x - xArray[n]) * (x - xArray[n]);
  }
  //x между X0 и XN
  let k = 0;
  do {
    k++;
  } while ((0 > (xArray[k] - xArray[k - 1]) * (xArray[k] - x) * (x - xArray[k - 1])) && (k < n));
  return a[k] + b[k] * (x - xArray[k]) + c[k] * sqr(x - xArray[k]) + d[k] * sqr(x - xArray[k]) * (x - xArray[k]);
}

//argument array
const xs = [1, 2, 3, 4, 5];
//function array
const ys = [9, 3, 6, 2, 4];
 
// get Y at arbitrary X
console.log(cSpline(xs, ys, 1.4));
 
// interpolate a line at a higher resolution
for (let i = 0; i <= 50; i++) {
  console.log(cSpline(xs, ys, i * 0.1));
}

module.exports = { add, subtract, sqr, cSpline};
