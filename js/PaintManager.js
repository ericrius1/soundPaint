var PaintManager = function() {

	this.domElement = document;
	var cb1 = this.launchPaint.bind(this);
	this.domElement.addEventListener("click", cb1);

	this.paintBalls = [];
	this.attractors = [];

}

PaintManager.prototype.launchPaint = function() {
	this.paintBalls.push(new PaintBall(controls.getDirection()));
}

PaintManager.prototype.update = function() {
	for (var i =  0; i < this.paintBalls.length; i++) {
		this.paintBalls[i].update(this.attractors);
	}
}

PaintManager.prototype.addAttractor = function (attractor) {
	this.attractors.push(attractor)
}


var PaintBall= function (direction) {
	// Each paintball hasa starting velocity
	this.velocity =  direction.clone().multiplyScalar(5)	;
	this.position = controls.getObject().position.clone();
	var geo = new THREE.SphereGeometry(5, 8, 8);
	this.mesh= new THREE.Mesh(geo);
	this.mesh.position.copy(this.position);
	scene.add(this.mesh);

	this.update = function(attractors) {
		// find  all the attractors within range of this paintball and apply forces
		// console.log(thi	s.velocity)
		var force = new THREE.Vector3().subVectors(attractors[0].position, this.position).normalize();
		force.multiplyScalar(attractors[0].strength);
		// Force falls off as a function of distance
		force.divideScalar(attractors[0].position.distanceTo(this.position));
		this.velocity.add(force)
		this.position.add(this.velocity);

		this.mesh.position.copy(this.position);

	}
}