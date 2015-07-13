var rF = THREE.Math.randFloat;
var forestSide = 1000;

var startingLocation = new THREE.Vector3(200, 7, 200);
var pillarLocation = new THREE.Vector3(200, 7, 200);


var canvasLocation = pillarLocation.clone();
canvasLocation.z -= 30;
canvasLocation.x += 20;

var orbLocation = canvasLocation.clone();
orbLocation.z += 40;
orbLocation.x += 40;
orbLocation.y += 10;


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