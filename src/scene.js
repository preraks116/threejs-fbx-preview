import '/style.css'
import * as THREE from 'three';
import { Plane } from './plane';
import { OrthoCamera } from './camera';
import { FBXModel } from './fbxModel';
import { gridHelper } from './grid';

const scene = new THREE.Scene();

const sceneObjects = {
    plane: new Plane({
        position: { x: 0, y: 0, z: 0 },
        dimension: { x: 200, y: 200 },
        color: 0xffff00,
        rotation: { x: -Math.PI / 2, y: 0, z: 0 },
    }, scene),
    grid: new gridHelper({
        position: { x: 0, y: 0, z: 0 },
        dimension: { x: 200, y: 200 },
        rotation: { x: 0, y: 0, z: 0 }
    }, scene),
}


function addModel(url, scale) {
    if(sceneObjects['model']) {
        // console.log(sceneObjects['model']);
        scene.remove(sceneObjects['model'].model);
        delete sceneObjects['model'];
    }
    let model = new FBXModel({
        position: { x: 0, y: 0, z: 0 },
        scale: { x: scale, y: scale, z: scale },
        mass: 0,
        resourceURL: url,
    }, scene);
    sceneObjects['model'] = model;
}

// camera
const camera = new OrthoCamera({
    position: { x: 100, y: 100, z: 100 },
    rotation: {
        order: 'YXZ',
        x: Math.atan(- 1 / Math.sqrt(2)),
        y: - Math.PI / 4,
        z: 0
    },
    lookAt: new THREE.Vector3(0, 0, 0),
    up: new THREE.Vector3(0, 1, 0),
    width: window.innerWidth / 100,
    height: window.innerHeight / 100,
    near: 1,
    far: 1000,
    frustumSize: 100,
    zoom: 0.5,
    aspect: window.innerWidth / window.innerHeight,
}, scene)

export { scene, sceneObjects, camera, addModel };