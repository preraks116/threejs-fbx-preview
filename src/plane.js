import * as THREE from 'three';

// Plane class
class Plane {
    constructor(props, scene) {
        this.position = props.position;
        this.color = props.color ? props.color : 0xffffff;
        this.scene = scene;
        this.dimension = props.dimension;
        this.rotation = props.rotation;

        const geometry = new THREE.PlaneGeometry(this.dimension.x, this.dimension.y);
        const material = new THREE.MeshPhongMaterial({ color: this.color, side: THREE.DoubleSide, transparent: true });
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z);
        this.mesh.name = 'plane';
        this.mesh.receiveShadow = true;
        this.scene.add(this.mesh);
    }
}

export { Plane };