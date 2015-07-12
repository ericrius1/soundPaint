var Canvas = function () {
  var geo = new THREE.PlaneGeometry(16, 16);

  var canvasElement = document.createElement("canvas");
  canvasElement.width = 1024;
  canvasElement.height = 1024;
  var canvasTexture = new THREE.Texture(canvasElement);
  
  var ctx = canvasElement.getContext("2d");
  canvasTexture.needsUpdate = true;
  var texture = new THREE.Texture(canvasElement);
  this.material = new THREE.MeshBasicMaterial({
    map: canvasTexture
  })
  var canvasMesh = new THREE.Mesh(geo);
  canvasMesh.position.copy(canvasLocation);
  scene.add(canvasMesh);

  this.update = function () {

  }

}


