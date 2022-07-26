import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import * as THREE from 'three';

const fbxLoader = new FBXLoader();

// recursive function that traverses through this.model and enables shadows for all meshes, and for groups, it calls itself
function enableShadows(object) {
    for (let i = 0; i < object.children.length; i++) {
        let child = object.children[i];
        if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
        }
        else {
            enableShadows(child);
        }
    }
}

function setMaterial(object) {
    // console.log(object.children);
    for(let i = 0; i < object.children.length; i++) {
        let child = object.children[i];
        if(child.isMesh) {
            const oldMat = child.material;
            child.material = new THREE.MeshPhongMaterial({
                color: oldMat.color,
                map: oldMat.map,
                //etc
            });
        }
        else {
            setMaterial(child);
        }
    }
}

class FBXModel {
    constructor(props, scene) {
        this.position = props.position;
        this.scale = props.scale ? props.scale : { x: 1, y: 1, z: 1 };
        this.scene = scene;
        this.resourceURL = props.resourceURL;

        // wait for the fbxLoader to load the model
        // following function is called when the model is loaded
        fbxLoader.load(this.resourceURL, (fbx) => {
            setMaterial(fbx);

            // threejs rendering
            this.isLoaded = true;
            // the loaded model
            this.model = fbx;
            this.model.name = 'model';
            // set the position and scale
            this.model.position.set(this.position.x, this.position.y, this.position.z);
            this.model.scale.set(this.scale.x, this.scale.y, this.scale.z);
            // this.model.rotation.x = - Math.PI / 2;   
            // add the model to the scene
            this.model.receiveShadow = true;
            this.model.castShadow = true;
            enableShadows(this.model);

            this.scene.add(this.model);
        });
    }
}
export { FBXModel };