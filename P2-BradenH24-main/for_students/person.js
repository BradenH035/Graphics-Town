import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import { GLTFLoader } from "../libs/CS559-Three/examples/jsm/loaders/GLTFLoader.js";

let numPeople = 0;
function loadModelAndAnimate(world, x, y, z, callback) {
    let gltfLoader = new GLTFLoader();
    gltfLoader.load("../for_students/animated_man01GLTF/scene.gltf", function(gltf) {
        let mixer = new T.AnimationMixer(gltf.scene);
        let action = mixer.clipAction(gltf.animations[17]);
        
        action.play();
        let model = gltf.scene;
        model.scale.set(0.04, 0.04, 0.04);
        model.position.set(x, y, z);
        world.scene.add(model);
        
        function firstFrame() {
            mixer.update(0.01);
            world.renderer.render(world.scene, world.camera);
            requestAnimationFrame(firstFrame);
        }
        firstFrame();
        callback(model);
    });
    
}

export class Person extends GrObject {
    constructor(world, params = {}) {
        let x = params.x || 0;
        let y = params.y || 0;
        let z = params.z || 0;
        let scaleValue = params.scale || 0.1;
        let model = null;
        loadModelAndAnimate(world, x, y, z, (loadedModel) => {
            model = loadedModel;
        });
        super(`Person-${numPeople++}`, model);

    }
}