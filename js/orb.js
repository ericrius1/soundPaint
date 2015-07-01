var Orb = function() {
  var lightDistance = 1000;
  var intensity = 1.5;
  var radius = 7;
  var sphereMat = new THREE.MeshBasicMaterial({
    color: 0xff00ff
  });
  var orbMesh = new THREE.Mesh(new THREE.SphereGeometry(radius, 20, 20), sphereMat);
  orbMesh.position.set( rF(-forestSide/2, forestSide/2), radius + 10, rF(-forestSide/2, forestSide/2) );
  scene.add(orbMesh);


  orbMesh.pointLight = new THREE.PointLight(0xffffff, intensity, lightDistance);
  orbMesh.pointLight.position.copy(controls.getObject().position);
  orbMesh.add(orbMesh.pointLight);

  this.move = function() {

    var curProps = {
      x: orbMesh.position.x,
      y: orbMesh.position.y,
      z: orbMesh.position.z,
    };
    var endProps = {
      x:  rF(-forestSide/2, forestSide/2),
      y: orbMesh.position.y,
      z: rF(-forestSide/2, forestSide/2)
    }
    var moveTween = new TWEEN.Tween(curProps).
      to(endProps, 14000).
      onUpdate(function(){
        orbMesh.position.set(curProps.x, curProps.y, curProps.z);
      }.bind(this)).
      start();

      moveTween.onComplete(function() {
        this.move();
      }.bind(this));
  }


}