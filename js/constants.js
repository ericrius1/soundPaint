var rF = THREE.Math.randFloat;
var forestSide = 1000;

var startingLocation = new THREE.Vector3(200, 7, 200);
var pillarLocation = new THREE.Vector3(200, 7, 200);


function map(value, min1, max1, min2, max2) {
  return min2 + (max2 - min2) * ((value - min1) / (max1 - min1));
}
