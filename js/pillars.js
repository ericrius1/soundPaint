var Pillars = function(center) {
  var radius = forestSide;
  var numPillars = 20;
  var pillars = [];


  var pillarGeo = new THREE.BoxGeometry(1, 1, 1);
  for(var i = 0; i < numPillars; i++){
    var pillMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color().setRGB(rF(0.4, 0.5), .1, rF(0.4, 0.5)),
      transparent: true,
      opacity: 0.8
    })
    var pillarMesh = new THREE.Mesh(pillarGeo, pillMat);
    pillarMesh.position.set(center.x + rF(-radius, radius), rF(5,10), center.z + rF(-radius, radius));
    pillarMesh.scale.set(rF(1, 2), rF(1, 5), rF(1, 2));
    scene.add(pillarMesh)
    pillars.push(pillarMesh);
  } 

  this.move = function () {
    _.each(pillars, function(pillar) {
      this.createTween(pillar);
    }.bind(this));


  }

  this.createTween = function(pillar) {
    var currentProps = {
      xRot: pillar.rotation.x,
      yRot: pillar.rotation.y,
      zRot: pillar.rotation.z,
    }

    var endProps = {
      xRot: rF( 0, Math.PI),
      yRot: rF(0, Math.PI),
      zRot: rF(0, Math.PI),
    };

    var rotTween = new TWEEN.Tween(currentProps).
      to(endProps, rF(5000, 10000)).
      onUpdate(function() {
        pillar.rotation.set(currentProps.xRot, currentProps.yRot, currentProps.zRot);
      }).start();

      rotTween.onComplete(function() {
        this.createTween(pillar);
      }.bind(this));
  }

  this.update = function() {
    _.each(pillars, function(pillar) {
      var distance = pillar.position.distanceTo(controls.getObject().position);
      var opacity = map(distance, 0, forestSide/10, 0.9, 0);
      pillar.material.opacity = opacity;
    })
  }
  

}