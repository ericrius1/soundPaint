var Attractor = function() {
	this.position = new  THREE.Vector3(2, 4, -5);
	this.strength = 10;

	var geo = new THREE.SphereGeometry(2, 2, 2);
	var sphereMesh= new THREE.Mesh(geo);
	sphereMesh.position = this.position;
	scene.add(sphereMesh);


}