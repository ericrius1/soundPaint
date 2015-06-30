var Forest = function() {


  var depth = 100;
  var treeMat = new THREE.MeshBasicMaterial({
    color: 0x4f0f0f
  })

  var floorMat = new THREE.MeshBasicMaterial({
    color: 0x0bff0c
  })
  var floor = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), floorMat);
  floor.rotation.x = -Math.PI/2;
  scene.add(floor);
  for (var i = 0; i < 100; i++) {
    var height = rF(15, 30);
    var tree = new THREE.Mesh(new THREE.BoxGeometry(2, height, 2), treeMat);
    var xPos = Math.random() < 0.5 ? rF(-4, -2) : rF(2, 4);
    var yPos = height/2;
    var zPos = rF(0, -depth)
    tree.position.set(xPos, yPos, zPos);
    scene.add(tree);
  };

};