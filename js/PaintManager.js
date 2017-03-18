var PaintManager = function() {

	this.domElement = document;
	var cb1 = this.launchPaint.bind(this);
	this.domElement.addEventListener("click", cb1);

	this.paintBalls = [];
	this.attractors = [];

}

PaintManager.prototype.launchPaint = function() {
	console.log("LAUNCH PAINT");

	this.paintBalls.push(new PaintBall());
}

PaintManager.prototype.update = function() {
	for (var i =  0; i < this.paintBalls.length; i++) {
		this.paintBalls[i].update(this.attractors);
	}
}

PaintManager.prototype.addAttractor = function (attractor) {
	this.attractors.push(attractor)
}


var PaintBall= function () {
	// Each paintball hasa starting velocity
	this.velocity = new THREE.Vector3(0, 0, -2);
	this.position = camera.position;
	
	var geo = new THREE.SphereGeometry(5, 8, 8);
	this.mesh= new THREE.Mesh(geo);
	this.mesh.position = this.position;
	scene.add(this.mesh);

	this.update = function(attractors) {
		// find  all the attractors within range of this paintball and apply forces
		var forceDirection = new THREE.Vector3().subVectors(attractors[0].position, this.position);
		this.mesh.position.add(this.velocity);
	}
}