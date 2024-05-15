import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";

let numNewCSBuildings = 0;

export class NewCSBuilding extends GrObject {
    constructor(params = {}) {
        let x = params.x || 0;
        let y = params.y || 13;
        let z = params.z || 0;
        let texture = params.texture || "../images/underconstruction.jpg";
        
        let group = new T.Group();
        let geometry = new T.BoxGeometry(40, 25, 30);
        let material = new T.MeshStandardMaterial({map: new T.TextureLoader().load(texture)});
        let cube = new T.Mesh(geometry, material);
        group.add(cube);
        group.position.set(x,y,z);
        super(`NewCSBuilding-${++numNewCSBuildings}`, group);
    }
}
