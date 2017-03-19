var Canvas = function(position, rotation) {
  var geo = new THREE.PlaneBufferGeometry(canvasSize, canvasSize);

  var canvasElement = document.createElement("canvas");
  canvasElement.width = canvasTextureSize;
  canvasElement.height = canvasTextureSize;
  this.canvasTexture = new THREE.Texture(canvasElement);

  this.drips = [];

  this.ctx = canvasElement.getContext("2d");
  this.ctx.translate(0.5, 0.5);    

  this.ctx.fillStyle = rgbToFillStyle(200, 0, 100, 0.3);
  this.ctx.fillRect(0, 0, canvasTextureSize, canvasTextureSize);
  this.ctx.lineJoin = this.ctx.lineCap = 'round';

  this.canvasTexture.needsUpdate = true;
  var texture = new THREE.Texture(canvasElement);
  this.material = new THREE.MeshPhysicalMaterial({
    map: this.canvasTexture,
    side: THREE.DoubleSide,
    color: 0xff00ff
  })
  var canvasMesh = new THREE.Mesh(geo, this.material);
  canvasMesh.position.copy(position);
  canvasMesh.rotation.copy(rotation);  
  scene.add(canvasMesh);
  // objectControls.add(canvasMesh);
  canvasMesh.select = function() {
    if( rotation.y === Math.PI) {
      var x = map(objectControls.intersectionPoint.x, canvasSize/2, -canvasSize/2,  0, canvasTextureSize);
      var y = map(objectControls.intersectionPoint.y, canvasSize/2, -canvasSize/2,  0, canvasTextureSize);  
    } else  if( rotation.y === 0) {
      var x = map(objectControls.intersectionPoint.x, -canvasSize/2, canvasSize/2,  0, canvasTextureSize);
      var y = map(objectControls.intersectionPoint.y, canvasSize/2, -canvasSize/2,  0, canvasTextureSize);  
    } else if (rotation.y === -Math.PI/2) {
       var x = map(objectControls.intersectionPoint.z, -canvasSize/2, canvasSize/2,  0, canvasTextureSize);
      var y = map(objectControls.intersectionPoint.y, canvasSize/2, -canvasSize/2,  0, canvasTextureSize);  
    } else if (rotation.y === Math.PI/2) {
      var x = map(objectControls.intersectionPoint.z, canvasSize/2, -canvasSize/2,  0, canvasTextureSize);
      var y = map(objectControls.intersectionPoint.y, canvasSize/2, -canvasSize/2,  0, canvasTextureSize);  
    }
    var position = new THREE.Vector2(x, y);
    // this.drips.push(drip);
  }.bind(this)

  this.update = function() {
    for(var i = 0; i < this.drips.length; i++) {
      var drip = this.drips[i];
      drip.vx += drip.ax;
      drip.vy += drip.ay;
      drip.x += drip.vx;
      drip.y += drip.vy;
      if (drip.y < canvasTextureSize && drip.x < canvasTextureSize){
        drip.draw();
      } else {
        this.drips.splice(i, 1);
      }
    }
    this.canvasTexture.needsUpdate = true;
  }

  this.createDrip = function(ctx, position, radius, velocity) {
    var drip = {
      x: position.x,
      y: position.y,
      prevX: position.x,
      prevY: position.y,
      radius: radius,
      color:  rgbToFillStyle(_.random(5, 100), _.random(5, 20), _.random(100, 200), .1),
      vx: velocity.x,
      vy: -velocity.y,
      ax: 0,
      ay: 0,
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
        this.radius -= .1
        this.ctx.stroke();
        this.ctx.closePath();

      }
    }

    this.drips.push(drip);
    return drip;
  }
}