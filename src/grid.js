import * as THREE from 'three';

// Plane class
class gridHelper {
    constructor(props, scene) {
        this.position = props.position;
        this.scene = scene;
        this.dimension = props.dimension;
        this.rotation = props.rotation;

        this.gridHelper = new THREE.GridHelper(this.dimension.x, this.dimension.y);
        this.gridHelper.position.set(this.position.x, this.position.y, this.position.z);
        this.gridHelper.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z);
        this.scene.add(this.gridHelper);
    }
}
export { gridHelper };