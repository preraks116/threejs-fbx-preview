const path = 'src/models/';

const fbxModels = {
    // testScene: {
    //     file: 'testScene/test-scene.fbx',
    //     scale: 0.01
    // },
    biome: {
        file: 'biome/biome.fbx',
        scale: 0.01
    },
    primitive: {
        file: 'primitives/test-primitives.fbx',
        scale: 0.01
    },
    primitive2: {
        file: 'primitives2/primitives2.fbx',
        scale: 0.01
    },
    // meeting: {
    //     file: 'meeting/meeting.fbx',
    //     scale: 0.01
    // },
    // meeting2: {
    //     file: 'meeting2/meeting2.fbx',
    //     scale: 0.01
    // },
    // meeting3: {
    //     file: 'meeting3/meeting3.fbx',
    //     scale: 0.01
    // },
    // meeting4: {
    //     file: 'meeting4/meeting4.fbx',
    //     scale: 0.01
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