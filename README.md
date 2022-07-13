# threejs-fbx-preview
An FBX model preview tool written in three js to easily inspect multiple fbx models in a scene.

## Getting Started
- Installing VS Code and NPM
- To run the code, open VS Code and opening the terminal (Ctrl + Shift + `)
- Open the terminal and run the following line to install all the dependencies.
```
$ npm i 
```

## Running the Code 
To run the code we run the following line
```
$ npm run dev
```
and open the link that appears on the browser.

## Adding FBX Models

### Step 1: Adding Model to `models` Folder
Create a folder under the `src/models` folder, and add all models and relevant files (textures) in that folder.

### Step 2: Adding to `models.js`
Under the `src/models.js` file, perform the following steps
- Add the fbx to the `fbxModels` variable as follows: 
```js
const fbxModels = {
    testScene: {
        file: 'testScene/test-scene.fbx',
        scale: 0.01
    },
    biome: {
        file: 'biome/biome.fbx',
        scale: 0.1
    },
    /////// Copy the code in this section here and replace names for each fbx 
    modelName: {
        file: 'folderName/fileName.fbx'
        scale: 0.01
    },
    /////// 
}
```
- Here, `folderName`, `fileName.fbx` needs to be replaced with the folder name and name of the `.fbx` file for the model that has to be added. `modelName` is **not important** and just needs to be any appropriate name.