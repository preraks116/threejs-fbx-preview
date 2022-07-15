const path = 'src/models/';

const fbxModels = {
    testScene: {
        file: 'testScene/test-scene.fbx',
        scale: 0.01
    },
    // biome: {
    //     file: 'biome/biome.fbx',
    //     scale: 0.1
    // },
    // passage1: {
    //     file: 'passage1/passage1.fbx',
    //     scale: 0.2
    // },
    // passage2: {
    //     file: 'passage2/passage2_textures.fbx',
    //     scale: 0.2
    // }
}

for ( let key in fbxModels ) {
    fbxModels[key].file = path + fbxModels[key].file;
}

export { fbxModels }