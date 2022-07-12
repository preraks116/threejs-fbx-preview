import '/style.css'
import * as THREE from 'three';
import { Plane } from './plane';
import { OrthoCamera } from './camera';
import { FBXModel } from './fbxModel';
import { gridHelper } from './grid';
import { fbxModels } from './models';

function addModels(sceneObjects, scene) {
    let x = -10;
    let z = -10;
    for (let key in fbxModels) {
        let scale = fbxModels[key].scale;
        const model = new FBXModel({
            position: { x: x, y: 0, z: z },
            scale: { x: scale, y: scale, z: scale },
            mass: 0,
            resourceURL: fbxModels[key].file,
        }, scene);
        sceneObjects[key] = model;
        x += 5;
        if (x > 20) {
            x = 0;
            z += 5;
        }
    }
}

const scene = new THREE.Scene();

const sceneObjects = {
    plane: new Plane({
        position: { x: 0, y: 0, z: 0 },
        dimension: { x: 50, y: 50 },
        color: 0xffff00,
        rotation: { x: -Math.PI / 2, y: 0, z: 0 },
    }, scene),
    grid: new gridHelper({
        position: { x: 0, y: 0, z: 0 },
        dimension: { x: 50, y: 50 },
        rotation: { x: 0, y: 0, z: 0 }
    }, scene),
}

addModels(sceneObjects, scene);

// camera
const camera = new OrthoCamera({
    position: { x: 20, y: 20, z: 20 },
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
    aspect: window.innerWidth / window.innerHeight,
}, scene)

export { scene, sceneObjects, camera };