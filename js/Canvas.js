var Canvas = function(position, rotation) {
  var geo = new THREE.PlaneBufferGeometry(canvasSize, canvasSize);

  var canvasElement = document.createElement("canvas");
  this.canvasTextureSize = 1024;
  canvasElement.width = this.canvasTextureSize;
  canvasElement.height = this.canvasTextureSize;
  this.canvasTexture = new THREE.Texture(canvasElement);

  this.drips = [];

  this.ctx = canvasElement.getContext("2d");
  this.ctx.translate(0.5, 0.5);    

  this.ctx.fillStyle = rgbToFillStyle(200, 0, 100, 0.3);
  this.ctx.fillRect(0, 0, this.canvasTextureSize, this.canvasTextureSize);
  this.ctx.lineJoin = this.ctx.lineCap = 'round';

  this.canvasTexture.needsUpdate = true;
  var texture = new THREE.Texture(canvasElement);
  this.material = new THREE.MeshLambertMaterial({
    map: this.canvasTexture,
    side: THREE.DoubleSide,
    color: 0xff00ff
  })
  var canvasMesh = new THREE.Mesh(geo, this.material);
  canvasMesh.position.copy(position);
  canvasMesh.rotation.copy(rotation);  
  scene.add(canvasMesh);
  objectControls.add(canvasMesh);
  canvasMesh.select = function() {
    if( rotation.y === Math.PI) {
      var x = map(objectControls.intersectionPoint.x, canvasSize/2, -canvasSize/2,  0, this.canvasTextureSize);
      var y = map(objectControls.intersectionPoint.y, canvasSize/2, -canvasSize/2,  0, this.canvasTextureSize);  
    } else  if( rotation.y === 0) {
      var x = map(objectControls.intersectionPoint.x, -canvasSize/2, canvasSize/2,  0, this.canvasTextureSize);
      var y = map(objectControls.intersectionPoint.y, canvasSize/2, -canvasSize/2,  0, this.canvasTextureSize);  
    } else if (rotation.y === -Math.PI/2) {
       var x = map(objectControls.intersectionPoint.z, -canvasSize/2, canvasSize/2,  0, this.canvasTextureSize);
      var y = map(objectControls.intersectionPoint.y, canvasSize/2, -canvasSize/2,  0, this.canvasTextureSize);  
    } else if (rotation.y === Math.PI/2) {
      var x = map(objectControls.intersectionPoint.z, canvasSize/2, -canvasSize/2,  0, this.canvasTextureSize);
      var y = map(objectControls.intersectionPoint.y, canvasSize/2, -canvasSize/2,  0, this.canvasTextureSize);  
    }
    var position = new THREE.Vector2(x, y);
    var drip = this.createDrip(this.ctx, position, 50);
    this.drips.push(drip);
  }.bind(this)

  this.update = function() {
    for(var i = 0; i < this.drips.length; i++) {
      var drip = this.drips[i];
      drip.vx += drip.ax;
      drip.vy += drip.ay;
      drip.x += drip.vx;
      drip.y += drip.vy;
      if (drip.y < this.canvasTextureSize && drip.x < this.canvasTextureSize){
        drip.draw();
      } else {
        this.drips.splice(i, 1);
      }
    }
    this.canvasTexture.needsUpdate = true;
  }

  this.createDrip = function(ctx, position, radius) {
    return {
      x: position.x,
      y: position.y,
      prevX: position.x,
      prevY: position.y,
      radius: radius,
      color:  rgbToFillStyle(_.random(5, 100), _.random(5, 20), _.random(100, 200), .1),
      vx: rF(0.1, 0.2),
      vy: rF(0.1, 0.2),
      ax: rF(-.1, .1),
      ay: rF(-1, 1),
      shouldUpdate: true,
      ctx: ctx,
      draw: function() {
        if(!this.shouldUpdate) {
          return;
        }
        this.ctx.beginPath();
        this.ctx.strokeStyle = this.color
        this.ctx.moveTo(this.prevX, this.prevY);
        this.ctx.lineTo(this.x, this.y);
        this.ctx.lineWidth = this.radius
        this.prevX = this.x;
        this.prevY = this.y;
        this.radius -= 2
        this.ctx.stroke();
        this.ctx.closePath();

      }
    }
  }
}