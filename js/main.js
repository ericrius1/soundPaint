
var scene, camera, renderer, composer, earth, light, stars, controls, objectControls, textSpawner, postParams, stats, testEarth;
var renderModel, effectBloom, effectCopy, effectFXAA, controlManager, orb, forest, canvas;
var clock = new THREE.Clock();
var time = 0;

$(document).ready(init);
function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio || 1);
  renderer.setSize(window.innerWidth, window.innerHeight);
  var glContainer = document.getElementById('glCanvasContainer');
  glCanvasContainer.appendChild(renderer.domElement);
  // controls = new THREE.OrbitControls(camera, glCanvasContainer);
  controls = new THREE.PointerLockControls(camera);
  scene.add(controls.getObject());
  controls.getObject().position.copy(startingLocation)
  controlManager = new Controls();
  controlManager.init();

  objectControls = new ObjectControls(controls.getObject(), glCanvasContainer);

  gui = new dat.GUI({
    autoplace: false
  });
  guiContainer = document.getElementById('GUI');
  guiContainer.appendChild(gui.domElement);

  stats = new Stats();
  document.body.appendChild(stats.domElement);

  forest = new Forest();
  // forest.lightning();

  orb = new Orb();
  orb.move();

  canvas = new Canvas(canvasLocation);

  animate();
}

function animate() {
  time += clock.getDelta();
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  // controls.update();
  controlManager.update(clock.getDelta());
  objectControls.update();
  forest.update();
  stats.update()
  TWEEN.update();
}

function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}




window.addEventListener('resize', onResize, false);