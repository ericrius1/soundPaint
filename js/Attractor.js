var Attractor = function() {
	this.position = new THREE.Vector3(-10, 5, -30);
	this.strength = 2

	var geo = new THREE.SphereGeometry(2, 8, 8);
	var sphereMesh= new THREE.Mesh(geo);
	sphereMesh.position.copy(this.position);
	scene.add(sphereMesh);


}