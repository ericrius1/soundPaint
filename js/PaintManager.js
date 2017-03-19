var canvasSize = 1024;
var canvasTextureSize = 1024;

var canvasDistance = canvasSize / 2;
var canvases = [];
var PaintManager = function() {

	this.domElement = document;
	var cb1 = this.launchPaint.bind(this);
	this.domElement.addEventListener("click", cb1);

	this.paintBalls = [];
	this.attractors = [];


	var canvas = new Canvas(new THREE.Vector3(0, 0, -canvasDistance), new THREE.Euler(0, 0, 0));
	canvases.push(canvas);
	canvas = new Canvas(new THREE.Vector3(0, 0, canvasDistance), new THREE.Euler(0, Math.PI, 0));
	canvases.push(canvas);
	canvas = new Canvas(new THREE.Vector3(-canvasDistance, 0, 0), new THREE.Euler(0, Math.PI / 2, 0));
	canvases.push(canvas);
	canvas = new Canvas(new THREE.Vector3(canvasDistance, 0, 0), new THREE.Euler(0, -Math.PI / 2, 0));
	canvases.push(canvas);


}

PaintManager.prototype.launchPaint = function() {
	this.paintBalls.push(new PaintBall(controls.getDirection()));
}

PaintManager.prototype.update = function() {
	for (var i = 0; i < canvases.length; i++) {
		canvases[i].update();
	}
	for (var i = 0; i < this.paintBalls.length; i++) {
		this.paintBalls[i].update(this.attractors);
	}
}

PaintManager.prototype.addAttractor = function(attractor) {
	this.attractors.push(attractor)
}


var PaintBall = function(direction) {
	// Each paintball hasa starting velocity
	this.velocity = direction.clone().multiplyScalar(5);
	this.position = controls.getObject().position.clone();
	var geo = new THREE.SphereGeometry(5, 8, 8);
	var mat = new THREE.MeshNormalMaterial();
	this.mesh = new THREE.Mesh(geo, mat);
	this.mesh.position.copy(this.position);
	scene.add(this.mesh);
	this.dead = false;

	this.update = function(attractors) {
		if (this.dead) {
			return;
		}
		// find  all the attractors within range of this paintball and apply forces
		// console.log(thi	s.velocity)
		var force = new THREE.Vector3().subVectors(attractors[0].position, this.position).normalize();
		force.multiplyScalar(attractors[0].strength);
		// Force falls off as a function of distance
		force.divideScalar(attractors[0].position.distanceTo(this.position));
		this.velocity.add(force)
		this.position.add(this.velocity);

		this.mesh.position.copy(this.position);

		if (this.position.z < -canvasDistance) {
			console.log("COLLISION!")
			 var x = map(this.position.x, -canvasSize/2, canvasSize/2,  0, canvasTextureSize);
            var y = map(this.position.y, canvasSize/2, -canvasSize/2,  0, canvasTextureSize);  
            var canvasPosition = new THREE.Vector2(x, y)
			canvases[0].createDrip(canvases[0].ctx, canvasPosition, 2s0, this.velocity)
			this.dead = true;
		} else if (this.position.z > canvasDistance) {

		}


	}
}