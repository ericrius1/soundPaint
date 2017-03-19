var Attractor = function() {
	this.position = new THREE.Vector3(-10, 5, -30);
	this.strength = 3

	var geo = new THREE.SphereGeometry(2, 8, 8);
	var mat = new THREE.MeshPhysicalMaterial({color: 0xff0000})
	var sphereMesh= new THREE.Mesh(geo, mat);
	sphereMesh.position.copy(this.position);
	scene.add(sphereMesh);


}