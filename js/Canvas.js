var Canvas = function() {
  var geo = new THREE.PlaneBufferGeometry(16, 16);

  var canvasElement = document.createElement("canvas");
  var canvasSize = 4096
  canvasElement.width = canvasSize;
  canvasElement.height = canvasSize;
  var canvasTexture = new THREE.Texture(canvasElement);

  var ctx = canvasElement.getContext("2d");
  ctx.translate(0.5, 0.5);

  ctx.fillStyle = rgbToFillStyle(200, 0, 100);
  ctx.fillRect(0, 0, canvasSize, canvasSize);
  
  ctx.beginPath();
  ctx.fillStyle = rgbToFillStyle(100, 10, 100);
  ctx.arc(canvasSize/2, canvasSize/2, canvasSize/10, 0, Math.PI * 2);
  ctx.fill();

  canvasTexture.needsUpdate = true;
  var texture = new THREE.Texture(canvasElement);
  this.material = new THREE.MeshBasicMaterial({
    map: canvasTexture,
    transparent: true,
    opacity: 0.95
  })
  var canvasMesh = new THREE.Mesh(geo, this.material);
  canvasMesh.position.copy(canvasLocation);
  scene.add(canvasMesh);

  objectControls.add(canvasMesh);
  canvasMesh.select = function() {
    
  }
  this.update = function() {

  }

}