import './style.css'

import * as THREE from 'three';
import { scene, camera } from './src/scene';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
let controls;

function onWindowResize() {
  let width = window.innerWidth / 100;
  let height = window.innerHeight / 100;
  camera.camera.left = width / - 2;
  camera.camera.right = width / 2;
  camera.camera.top = height / 2;
  camera.camera.bottom = height / - 2;
  camera.camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

async function init() {
  renderer.shadowMap.enabled = true;
  renderer.localClippingEnabled = false;;
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // add orbit controls
  controls = new OrbitControls(camera.camera, renderer.domElement);
  
  // add ambient light 
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  // add directional light
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(0, 1, 1);
  directionalLight.castShadow = true;
  // directionalLight.shadow.camera.near = 0.1;
  // directionalLight.shadow.camera.far = 100;
  // directionalLight.shadow.camera.left = -20;
  // directionalLight.shadow.camera.right = 20;
  // directionalLight.shadow.camera.top = 20;
  // directionalLight.shadow.camera.bottom = -20;
  // directionalLight.shadow.mapSize.width = 2048;
  // directionalLight.shadow.mapSize.height = 2048;
  scene.add(directionalLight);

  window.addEventListener('resize', onWindowResize);
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera.camera);
}

init();
animate();