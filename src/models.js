const path = 'src/models/';

const fbxModels = {
    testScene: {
        file: 'testScene/test-scene.fbx',
        scale: 0.01
    },
    biome: {
        file: 'biome/biome.fbx',
        scale: 0.1
    },
}

for ( let key in fbxModels ) {
    fbxModels[key].file = path + fbxModels[key].file;
}

export { fbxModels }