import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import { Car } from "./car.js";
let numRoads = 0;
export class Road extends GrObject {
    /**
     * 
     * @param {Number} x
     * @param {Number} y
     * @param {Number} z
     */
    constructor(params = {}) {
        let x = params.x || 0;
        let y = params.y || 0.2;
        let z = params.z || 0;
        let length = params.length || 100;
        let numLanes = params.numLanes || 2;
        let xDir = params.xDir || true;
        
        let group = new T.Group();
        // Road
        let roadGroup = new T.Group();
        let road = new T.BoxGeometry(numLanes * 8, 0.1, length);
        let roadMat = new T.MeshStandardMaterial({color: "grey"});
        let roadMesh = new T.Mesh(road, roadMat);
        roadGroup.add(roadMesh);

        // Lane Markings
        let laneMarking = new T.BoxGeometry(0.5, 0.01, length);
        let laneMarkingMat = new T.MeshStandardMaterial({color: "white"});
        for (let i = 0; i < length/10; i+=10) {
            let laneMesh = new T.Mesh(laneMarking, laneMarkingMat);
            laneMesh.position.set(x, y + 0.1, z);
            roadGroup.add(laneMesh);
        }
        
        roadMesh.position.set(x, y, z);

        group.add(roadGroup);
        if (xDir) {
            group.rotateY(Math.PI / 2);
        }
        super(`Road-${++numRoads}`, group);
    }
}
