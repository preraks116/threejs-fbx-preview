import './style.css'

import * as THREE from 'three';
import { scene, camera, addModel, sceneObjects } from './src/scene';
import { MapControls } from 'three/examples/jsm/controls/OrbitControls';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
const stats = document.getElementById('stats');
const form = document.getElementById('upload');
const name = document.getElementById('name');
const scale = document.getElementById('scale');
const upload = document.getElementById('file');

let controls, statistics, gui;
let modelFolder;
let uploadURL = '';

function setWireframe(model, value) {
  for(let i = 0; i < model.children.length; i++) {
    let child = model.children[i];
    if(child.isMesh) {
      child.material.wireframe = value;
    }
    else {
      setWireframe(child, value);
    }
  }
}

function getWireframe(model) {
  for(let i = 0; i < model.children.length; i++) {
    let child = model.children[i];
    if(child.isMesh) {
      return child.material.wireframe;
    }
    else {
      return getWireframe(child);
    }
  }
}

form.addEventListener('submit', function (event) {
  event.preventDefault();
  // check if scale.value or uploadURL are empty and prevent submission
  if (scale.value === '' || scale.value === '0') {
    scale.value = 1;
  }
  if (uploadURL !== '') {
    if(sceneObjects['model']) {
      scene.remove(sceneObjects['model'].model);
      delete sceneObjects['model'];
      modelFolder.destroy();
    }
    addModel(uploadURL, scale.value);
    // wait for 2 seconds
    setTimeout(() => {
      let model = scene.getObjectByName('model');
      modelFolder = gui.addFolder('Model');
      let modelRotationFolder = modelFolder.addFolder('Rotation');
      let rotationprops = {
        get 'X'() {
          return model.rotation.x;
        },
        set 'X'(value) {
          model.rotation.x = value;
        },
        get 'Y'() {
          return model.rotation.y;
        },
        set 'Y'(value) {
          model.rotation.y = value;
        },
        get 'Z'() {
          return model.rotation.z;
        },
        set 'Z'(value) {
          model.rotation.z = value;
        }
      }
      let wireframeProps = {
        get 'wireframe'() {
          return getWireframe(model);
        },
        set 'wireframe'(value) {
          setWireframe(model, value);
        }
      }
      modelFolder.add(wireframeProps, 'wireframe');
      modelRotationFolder.add(rotationprops, 'X', -Math.PI, Math.PI);
      modelRotationFolder.add(rotationprops, 'Y', -Math.PI, Math.PI);
      modelRotationFolder.add(rotationprops, 'Z', -Math.PI, Math.PI);
    }, 2000);
  }
  else {
    alert('Please enter a scale and upload a file');
  }
});

upload.addEventListener('change', function (event) {
  uploadURL = URL.createObjectURL(event.target.files[0]);
  name.innerHTML = event.target.files[0].name;
});

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
  controls = new MapControls(camera.camera, renderer.domElement);
  // stats
  statistics = new Stats();
  statistics.dom.id = 'statistics';
  document.body.appendChild(statistics.dom);

  // add ambient light 
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  // add directional light
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(0, 5, 1);
  // directionalLight.position.set(0, 1, 1);
  directionalLight.castShadow = true;
  directionalLight.shadow.camera.near = 0.1;
  directionalLight.shadow.camera.far = 100;
  directionalLight.shadow.camera.left = -20;
  directionalLight.shadow.camera.right = 20;
  directionalLight.shadow.camera.top = 20;
  directionalLight.shadow.camera.bottom = -20;
  directionalLight.shadow.mapSize.width = 2048;
  directionalLight.shadow.mapSize.height = 2048;
  scene.add(directionalLight);

  const helper = new THREE.DirectionalLightHelper(directionalLight, 1, 0xf00000);
  scene.add(helper);

  gui = new GUI({ autoPlace: false });
  gui.domElement.id = 'gui';
  gui_container.appendChild(gui.domElement);
  const lightingFolder = gui.addFolder('Lighting');
  const directionalLightFolder = lightingFolder.addFolder('Directional Light');
  const directionalLightPositionFolder = directionalLightFolder.addFolder('Position');
  const directionLightRotationFolder = directionalLightFolder.addFolder('Rotation');
  const ambientLightFolder = lightingFolder.addFolder('Ambient Light');
  const propsAmbientLight = {
    get 'Intensity'() {
      return ambientLight.intensity;
    },
    set 'Intensity'(value) {
      ambientLight.intensity = value;
    },
    get 'Color'() {
      return ambientLight.color.getHex();
    },
    set 'Color'(value) {
      ambientLight.color.setHex(value);
    }
  }
  const propsDirectionalLight = {
    get 'Intensity'() {
      return directionalLight.intensity;
    },
    set 'Intensity'(value) {
      directionalLight.intensity = value;
    },
    get 'Color'() {
      return directionalLight.color.getHex();
    },
    set 'Color'(value) {
      directionalLight.color.setHex(value);
    }
  }
  const propsDirectionalLightPosition = {
    get 'X'() {
      return directionalLight.position.x;
    },
    set 'X'(value) {
      directionalLight.position.x = value;
    },
    get 'Y'() {
      return directionalLight.position.y;
    },
    set 'Y'(value) {
      directionalLight.position.y = value;
    },
    get 'Z'() {
      return directionalLight.position.z;
    },
    set 'Z'(value) {
      directionalLight.position.z = value;
    }
  }
  const propsDirectionalLightRotation = {
    get 'X'() {
      return directionalLight.rotation.x;
    },
    set 'X'(value) {
      directionalLight.rotation.x = value;
    },
    get 'Y'() {
      return directionalLight.rotation.y;
    },
    set 'Y'(value) {
      directionalLight.rotation.y = value;
    },
    get 'Z'() {
      return directionalLight.rotation.z;
    },
    set 'Z'(value) {
      directionalLight.rotation.z = value;
    }
  }
  const propsDirectionalLightHelper = {
    get 'Helper'() {
      return helper.visible;
    },
    set 'Helper'(value) {
      helper.visible = value;
    }
  }
  const propsDirectionalLightShadow = {
    get 'Shadows'() {
      return directionalLight.castShadow;
    },
    set 'Shadows'(value) {
      directionalLight.castShadow = value;
    }
  }
  ambientLightFolder.add(propsAmbientLight, 'Intensity', 0, 1).step(0.01);
  ambientLightFolder.addColor(propsAmbientLight, 'Color').onChange(function (value) {
    ambientLight.color.setHex(value);
  });
  directionalLightFolder.add(propsDirectionalLight, 'Intensity', 0, 5).step(0.01);
  directionalLightFolder.addColor(propsDirectionalLight, 'Color').onChange(function (value) {
    lighting.directionalLight.color.setHex(value);
  });
  directionalLightFolder.add(propsDirectionalLightHelper, 'Helper').onChange(function (value) {
    helper.visible = value;
  });
  directionalLightFolder.add(propsDirectionalLightShadow, 'Shadows').onChange(function (value) {
    directionalLight.castShadow = value;
  });
  directionalLightPositionFolder.add(propsDirectionalLightPosition, 'X', -100, 100).step(0.01);
  directionalLightPositionFolder.add(propsDirectionalLightPosition, 'Y', -100, 100).step(0.01);
  directionalLightPositionFolder.add(propsDirectionalLightPosition, 'Z', -100, 100).step(0.01);
  directionLightRotationFolder.add(propsDirectionalLightRotation, 'X', -Math.PI, Math.PI).step(0.01);
  directionLightRotationFolder.add(propsDirectionalLightRotation, 'Y', -Math.PI, Math.PI).step(0.01);
  directionLightRotationFolder.add(propsDirectionalLightRotation, 'Z', -Math.PI, Math.PI).step(0.01);

  window.addEventListener('resize', onWindowResize);
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  // if(sceneObjects['model']) {
  //   console.log(sceneObjects['model']);
  // }
  // console.log(renderer.info);
  // add the renderer.info stats to the page
  stats.innerHTML = `
    <div>
      <p>Draw Calls: ${renderer.info.render.calls}</p>
      <p>Triangles: ${(renderer.info.render.triangles)}</p>
    </div>
  `;
  statistics.begin();
  renderer.render(scene, camera.camera);
  statistics.end();
}

init();
animate();