var Canvas = function() {
  this.canvasMeshSize = 32;
  var geo = new THREE.PlaneBufferGeometry(this.canvasMeshSize, this.canvasMeshSize);

  var canvasElement = document.createElement("canvas");
  this.canvasTextureSize = 4096;
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
    transparent: true,
    opacity: 0.95
  })
  var canvasMesh = new THREE.Mesh(geo, this.material);
  canvasMesh.position.copy(canvasLocation);
  canvasMesh.position.y += this.canvasMeshSize/2 - 7
  scene.add(canvasMesh);
  objectControls.add(canvasMesh);
  canvasMesh.select = function() {
    var x = map(objectControls.intersectionPoint.x, -this.canvasMeshSize/2, this.canvasMeshSize/2,  0, this.canvasTextureSize);
    var y = map(objectControls.intersectionPoint.y, this.canvasMeshSize/2, -this.canvasMeshSize/2,  0, this.canvasTextureSize);
    var position = new THREE.Vector2(x, y);
    var drip = this.createDrip(this.ctx, position);
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

  this.createDrip = function(ctx, position) {
    return {
      x: position.x,
      y: position.y,
      prevX: position.x,
      prevY: position.y,
      radius: 200,
      color:  rgbToFillStyle(_.random(5, 15), _.random(5, 15), _.random(100, 200)),
      vx: rF(0.1, 0.2),
      vy: rF(0.1, 0.2),
      ax: rF(.1, .2),
      ay: rF(1, 2),
      ctx: ctx,
      draw: function() {
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