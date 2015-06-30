var scene, camera, renderer, composer, earth, light, stars, controls, objectControls, textSpawner, postParams, stats, testEarth;
var renderModel, effectBloom, effectCopy, effectFXAA, controlManager;
var clock = new THREE.Clock();

init();

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.set(0, 10, 0);

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio || 1);
  renderer.setSize(window.innerWidth, window.innerHeight);
  var glContainer = document.getElementById('glCanvasContainer');
  glCanvasContainer.appendChild(renderer.domElement);
  // controls = new THREE.OrbitControls(camera, glCanvasContainer);
  controls = new THREE.PointerLockControls(camera);
  scene.add(controls.getObject());
  controlManager = new Controls();
  controlManager.init();

  objectControls = new ObjectControls(camera, glCanvasContainer);

  gui = new dat.GUI({
    autoplace: false
  });
  guiContainer = document.getElementById('GUI');
  guiContainer.appendChild(gui.domElement);

  stats = new Stats();
  document.body.appendChild(stats.domElement);

  var forest = new Forest();

  animate();
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  controlManager.update(clock.getDelta());
  objectControls.update();
  stats.update()
  TWEEN.update();
}

function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function map(value, min1, max1, min2, max2) {
  return min2 + (max2 - min2) * ((value - min1) / (max1 - min1));
}



window.addEventListener('resize', onResize, false);