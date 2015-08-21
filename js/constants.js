var rF = THREE.Math.randFloat;


function map(value, min1, max1, min2, max2) {
  return min2 + (max2 - min2) * ((value - min1) / (max1 - min1));
}


function rgbToFillStyle(r, g, b, a) {
  if (a === undefined) {
    return ["rgb(", r, ",", g, ",", b, ")"].join('');
  } else {
    return ["rgba(", r, ",", g, ",", b, ",", a, ")"].join('');
  }
}