import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

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

class FBXModel {
    constructor(props, scene) {
        this.position = props.position;
        this.scale = props.scale;
        this.scene = scene;
        this.resourceURL = props.resourceURL;

        // wait for the fbxLoader to load the model
        // following function is called when the model is loaded
        fbxLoader.load(this.resourceURL, (fbx) => {
            // threejs rendering
            this.isLoaded = true;
            // the loaded model
            this.model = fbx;
            // set the position and scale
            this.model.position.set(this.position.x, this.position.y, this.position.z);
            this.model.scale.set(this.scale.x, this.scale.y, this.scale.z);
            // add the model to the scene
            this.model.receiveShadow = true;
            this.model.castShadow = true;
            enableShadows(this.model);

            this.scene.add(this.model);
        });
    }
}
export { FBXModel };