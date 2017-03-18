
var scene, camera, renderer, composer, earth, light, stars, controls, objectControls, textSpawner, postParams, stats, testEarth;
var renderModel, effectBloom, effectCopy, effectFXAA, controlManager, orb, forest, attractor, paintManager;
var clock = new THREE.Clock();
var canvases = [];
var time = 0;

$(document).ready(init);
function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, .1, 10000);
  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio || 1);
  renderer.setSize(window.innerWidth, window.innerHeight);
  var glContainer = document.getElementById('glCanvasContainer');
  glCanvasContainer.appendChild(renderer.domElement);
  controls = new THREE.PointerLockControls(camera);
  scene.add(controls.getObject());
  controlManager = new Controls();
  controlManager.init();

  objectControls = new ObjectControls( );

  gui = new dat.GUI({
    autoplace: false
  });
  guiContainer = document.getElementById('GUI');
  guiContainer.appendChild(gui.domElement);

  stats = new Stats();
  document.body.appendChild(stats.domElement);

  var canvasSize = 2000;
  var canvas = new Canvas(new THREE.Vector3(0, 0, -canvasSize/8), new THREE.Euler(0, 0, 0));
  canvases.push(canvas);
  // canvas = new Canvas(new THREE.Vector3(0, 0, canvasSize/8), new THREE.Euler(0, Math.PI, 0));
  canvas = new Canvas(new THREE.Vector3(-canvasSize/8, 0, 0), new THREE.Euler(0, Math.PI/2, 0));
  canvases.push(canvas);
  // canvas = new Canvas(new THREE.Vector3(canvasSize/8, 0, 0), new THREE.Euler(0, -Math.PI/2, 0));

  attractor = new Attractor();
  paintManager = new PaintManager();
  paintManager.addAttractor(attractor);
  animate();
}

function animate() {
  time += clock.getDelta();
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  controlManager.update(clock.getDelta());
  objectControls.update();
  stats.update()
  TWEEN.update();
  paintManager.update();

  for(var i = 0; i < canvases.length; i++) {
    canvases[i].update();
  }
}

function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}




window.addEventListener('resize', onResize, false);