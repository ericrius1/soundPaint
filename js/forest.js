var Forest = function() {

  var numTrees = 100;
  var treeMat = new THREE.MeshLambertMaterial({
    color: 0x4f0f0f
  })

  var miteGroup = new SPE.Group({
    texture: THREE.ImageUtils.loadTexture('assets/smokeParticle.png'),
    age: 200
  })

  var miteEmitter = new SPE.Emitter({
    position: new THREE.Vector3(0, 1, 0),
    positionSpread: new THREE.Vector3(100, 1, 100),
    velocitySpread: new THREE.Vector3(100, 1, 100),
    particleCount: 1000,
    opacityEnd: 1
  });

  miteGroup.addEmitter(miteEmitter);
  miteGroup.mesh.frustumCulled = false;
  scene.add(miteGroup.mesh);


  var floorMat = new THREE.MeshLambertMaterial({
    color: 0x0c3c05
  })
  var floor = new THREE.Mesh(new THREE.PlaneGeometry(forestSide, forestSide, 100, 100), floorMat);
  floor.rotation.x = -Math.PI / 2;
  scene.add(floor);
  for (var i = 0; i < numTrees; i++) {
    var height = rF(15, 30);
    var tree = new THREE.Mesh(new THREE.BoxGeometry(2, height, 2), treeMat);
    var xPos = rF(-forestSide/2, forestSide/2);
    var yPos = height / 2;
    var zPos = rF(-forestSide/2, forestSide/2);
    tree.position.set(xPos, yPos, zPos);
    scene.add(tree);
  };

  this.update = function() {
    miteGroup.tick();
  }
}
