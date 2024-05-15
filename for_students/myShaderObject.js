import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { shaderMaterial } from '../libs/CS559-Framework/shaderHelper.js';

let numTables = 0;
export class PatioFurniture extends GrObject {
    constructor(params = {}) {
        let x = params.x || 0;
        let y = params.y || 0;
        let z = params.z || 0;
        let rotation = params.rotation || 0;
        let size = params.size || 1;
        let numChairs = params.numChairs || 3;
        let vertexShaderURL = params.vertexShaderURL || './myShader/myVertexShader.vs';
        let fragmentShaderURL = params.fragmentShaderURL || './myShader/myFragmentShader.fs';
        
        let furniture = new T.Group();
        // Make 3 chairs
        for (let i = 0; i < numChairs; i++) {
            let chairColor = new T.Vector3(1, 1, 0);
            let randNum = Math.random();
            if (randNum < 0.33) {
                chairColor = new T.Vector3(0, 1, 0);
            } else if (randNum < 0.66) {
                chairColor = new T.Vector3(1, 0.5, 0);
            }
            let customMaterial = shaderMaterial(vertexShaderURL, fragmentShaderURL, {
                side: T.DoubleSide,
                uniforms: {
                  checks: { value: 10.0 },
                  light: { value: chairColor },
                  dark: { value: new T.Vector3(0, 0, 0) },
                },
              });    
              
            let chair = new T.Group();
            let seatGeom = new T.BoxGeometry(size, 0.2, size);
            let seatMesh = new T.Mesh(seatGeom, customMaterial);
            let backGeom = new T.BoxGeometry(0.2, size, size);
            let backMesh = new T.Mesh(backGeom, customMaterial);
            let legGeom = new T.CylinderGeometry(0.1, 0.1, size, 16);
            let leg1 = new T.Mesh(legGeom, customMaterial);
            let leg2 = new T.Mesh(legGeom, customMaterial);
            let leg3 = new T.Mesh(legGeom, customMaterial);
            let leg4 = new T.Mesh(legGeom, customMaterial);
            backMesh.position.set(0 - 0.1, size / 2, -size/2);
            backMesh.rotateY(Math.PI / 2)
            leg1.position.set(size / 2 - 0.1, -size / 2, size / 2 - 0.1);
            leg2.position.set(size / 2 - 0.1, -size / 2, -size / 2 + 0.1);
            leg3.position.set(-size / 2 + 0.1, -size / 2, size / 2 - 0.1);
            leg4.position.set(-size / 2 + 0.1, -size / 2, -size / 2 + 0.1);
            chair.add(seatMesh);
            chair.add(backMesh);
            chair.add(leg1);
            chair.add(leg2);
            chair.add(leg3);
            chair.add(leg4);
            
            furniture.add(chair);
            // set the chairs around the table
            if (i == 0) {
                chair.position.set(-size*1.4, 0, -size);
                chair.rotateY(Math.PI / 3);

            }
            if (i == 1) {
                chair.position.set(-size, 0, size*1.4);
                chair.rotateY(2*Math.PI / 3);
            }
            if (i == 2) {
                chair.position.set(size*1.4, 0, -size);
                chair.rotateY(-Math.PI/3);
            }
        }

        let color = new T.Vector3(1, 1, 0);
        let rand = Math.random();
        if (rand < 0.33) {
            color = new T.Vector3(0, 1, 0);
        } else if (rand < 0.66) {
            color = new T.Vector3(1, 0.5, 0);
        }
        let chairMaterial = shaderMaterial(vertexShaderURL, fragmentShaderURL, {
            side: T.DoubleSide,
            uniforms: {
              checks: { value: 10.0 },
              light: { value: color },
              dark: { value: new T.Vector3(0, 0, 0) },
            },
          });
        
        // Make 1 table
        let table = new T.Group();
        let tableGeom = new T.CylinderGeometry(size, size, 0.2, 16)
        let tableMesh = new T.Mesh(tableGeom, chairMaterial);
        let legGeom = new T.CylinderGeometry(0.1, 0.1, size, 16);
        let leg1 = new T.Mesh(legGeom, chairMaterial);
        let leg2 = new T.Mesh(legGeom, chairMaterial);
        let leg3 = new T.Mesh(legGeom, chairMaterial);
        let leg4 = new T.Mesh(legGeom, chairMaterial);
        tableMesh.position.set(0, 0, 0);
        leg1.position.set(size / 2 - 0.1, -size / 2, size / 2 - 0.1);
        leg2.position.set(size / 2 - 0.1, -size / 2, -size / 2 + 0.1);
        leg3.position.set(-size / 2 + 0.1, -size / 2, size / 2 - 0.1);
        leg4.position.set(-size / 2 + 0.1, -size / 2, -size / 2 + 0.1);
        table.add(tableMesh);
        table.add(leg1);
        table.add(leg2);
        table.add(leg3);
        table.add(leg4);
        furniture.add(table);

        furniture.position.set(x, y, z);
        furniture.rotateY(rotation);
        super(`PatioFurniture-${++numTables}`, furniture);
    }
}