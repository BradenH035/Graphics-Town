import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";


let numUnionSouth = 0;

export class UnionSouth extends GrObject {
    /**
     * 
     * @param {Number} x
     * @param {Number} y
     * @param {Number} z
     */
    constructor(params = {}) {
        let x = params.x || 0;
        let y = params.y || 4;
        let z = params.z || 0;

        let pi = Math.PI;
        let group = new T.Group();
    
        //let thing = drawLayer(4, 3, 0.5, 0xfff0db);
        // let material = new T.MeshStandardMaterial({ color: 0xfff0db });
        // let cube = new T.Mesh(geometry, material);

        let baseGeom = new T.BoxGeometry(35, 8, 15);
        let m = new T.MeshStandardMaterial({color: 0xfff0db, side: T.DoubleSide});
        let base = new T.Mesh(baseGeom, m);
        group.add(base);
        base.position.set(8, 0, 0);

        let baseGeom2 = new T.BoxGeometry(14, 8, 25);
        let base2 = new T.Mesh(baseGeom2, m);
        base2.position.set(-16, 0, -9);
        group.add(base2);

        let roofGeom1 = new T.BoxGeometry(35, 1, 4);
        let m1 = new T.MeshStandardMaterial({color: 0xd9b99b, side: T.DoubleSide});
        let roof1 = new T.Mesh(roofGeom1, m1);
        roof1.position.set(8, 2, 9.5);
        group.add(roof1);

        let roofGeom2 = new T.BoxGeometry(14, 1, 4);
        let roof2 = new T.Mesh(roofGeom2, m1);
        roof2.position.set(-16, 2, 6);
        group.add(roof2);

        let roof3Geom = new T.BoxGeometry(4, 1, 30);
        let roof3 = new T.Mesh(roof3Geom, m1);
        roof3.position.set(-25, 2, -7);
        group.add(roof3);

        for (let i = 0; i < 6; i++) {
            let pole = poleMaker(6);
            pole.position.set(-6+ 6 * i, -1, 10.5);
            group.add(pole);
        }

        for (let i = 0; i < 2; i++) {
            let pole = poleMaker(6);
            pole.position.set(-21+ 10 * i, -1, 7);
            group.add(pole);
        }

        for (let i = 0; i < 6; i++) {
            let pole = poleMaker(6);
            pole.position.set(-26, -1, -21 + 5.5 * i);
            group.add(pole);
        }

        let hotelGroup = new T.Group();
        let hotelGeom = new T.CylinderGeometry(12,12,7, 20, 1, false, 0, pi);
        let hotelMat = new T.MeshStandardMaterial({color: 0xa69279, side: T.DoubleSide});
        let hotel = new T.Mesh(hotelGeom, hotelMat);
        hotelGroup.add(hotel);
       
        let hotelPlateGeom = new T.BoxGeometry(24, 7, 0.5);
        let hotelPlate = new T.Mesh(hotelPlateGeom, hotelMat);
        hotelPlate.rotateY(pi/2);
        hotelGroup.add(hotelPlate);


        let hotelBase2Geom = new T.BoxGeometry(36, 7, 9);
        let hotelBase2 = new T.Mesh(hotelBase2Geom, hotelMat);
        hotelBase2.position.set(-18, 0, -7.5);
        hotelGroup.add(hotelBase2);
    
        group.add(hotelGroup);
        hotelGroup.position.set(-11, 7, -9);
        hotelGroup.rotateY(pi);

        let hotelGroup2 = new T.Group();
        let hotel2Geom = new T.CylinderGeometry(12,12,6, 20, 1, false, 0, pi);
        let hotel2 = new T.Mesh(hotel2Geom, hotelMat);
        hotelGroup2.add(hotel2);

        let hotel2PlateGeom = new T.BoxGeometry(24, 6, 0.5);
        let hotel2Plate = new T.Mesh(hotel2PlateGeom, hotelMat);
        hotel2Plate.rotateY(pi/2);
        hotelGroup2.add(hotel2Plate);

        group.add(hotelGroup2);
        hotelGroup2.position.set(-10, 13, -9);
        hotelGroup2.rotateY(2.3*pi/2);

        for (let i = 0; i < 5; i++) {
            let window = windowMaker(4.5, 4.5, 0.2);
            window.position.set(-3 + 6 * i, -1, 7.5);
            group.add(window);
        }

        for (let i = 0; i < 4; i++) {
            let window = windowMaker(4, 4.5, 0.2);
            window.position.set(-23, -1, -18 + 5.5 * i);
            group.add(window);
            window.rotateY(pi/2);
        }

        for (let i = 0; i < 4; i++) {
            let door = doorMaker(2.5, 5.5, 0.4);
            door.position.set(-20+2.6*i, -1.3, 4);
            group.add(door);
        }

        // windows for hotel
        for (let i = 0; i < 7; i++) {
            let window = windowMaker(4.5, 4.5, 0.2);
            window.position.set(-8+5*i, 7.5, 3);
            group.add(window);
        }
        // big window for hotel
        let bigWindowGeom = new T.CylinderGeometry(12, 12, 4.5, 20, 1, false, 0, pi);
        let windowMat = new T.MeshStandardMaterial({color: "lightblue", side: T.DoubleSide, opacity: 0.5});
        let bigWindow = new T.Mesh(bigWindowGeom, windowMat);
        group.add(bigWindow);
        bigWindow.position.set(-11.1, 7.5, -9);
        bigWindow.rotateY(pi);

        // big window for hotel2
        let bigWindowGeom2 = new T.CylinderGeometry(12, 12, 3.5, 20, 1, false, 0, pi);
        let bigWindow2 = new T.Mesh(bigWindowGeom2, windowMat);
        group.add(bigWindow2);
        bigWindow2.position.set(-10.2, 13.5, -8.9);
        bigWindow2.rotateY(2.3*pi/2);

        group.position.x = x;
        group.position.y = y;
        group.position.z = z;
        super(`UnionSouth-${++numUnionSouth}`, group);

    }
}


function poleMaker(height) {
    let poleGeom = new T.CylinderGeometry(0.5, 0.5, height, 32);
    let poleMat = new T.MeshStandardMaterial({color: 0xd9b99b});
    let pole = new T.Mesh(poleGeom, poleMat);
    return pole;
}

function windowMaker(length, width, height) {
    let windowGeom = new T.BoxGeometry(length, width, height);
    let windowMat = new T.MeshStandardMaterial({color: "lightblue", side: T.DoubleSide, opacity: 0.5});
    let window = new T.Mesh(windowGeom, windowMat);
    return window;
}

function doorMaker(length, width, height) {
    let door = new T.Group();
    let doorGeom = new T.BoxGeometry(length, width, height);
    let doorMat = new T.MeshStandardMaterial({color: 0xc0c0c0, side: T.DoubleSide});
    let doorMesh = new T.Mesh(doorGeom, doorMat);
    door.add(doorMesh);
    let doorHandleGeom = new T.CylinderGeometry(0.1, 0.1, length, 32);
    let extendHandleGeom = new T.CylinderGeometry(0.1, 0.1, 0.2, 32);
    let doorHandleMat = new T.MeshStandardMaterial({color: 0x000000});
    let doorHandle = new T.Mesh(doorHandleGeom, doorHandleMat);
    let extendHandle = new T.Mesh(extendHandleGeom, doorHandleMat);
    let extendHandle2 = new T.Mesh(extendHandleGeom, doorHandleMat);
    door.add(doorHandle);
    door.add(extendHandle);
    door.add(extendHandle2);
    doorHandle.position.set(0, 0, 0.4);
    extendHandle.position.set(-0.9, 0, 0.2);
    extendHandle.rotateX(Math.PI/2);
    extendHandle2.position.set(0.9, 0, 0.2);
    extendHandle2.rotateX(Math.PI/2);
    doorHandle.rotateZ(Math.PI/2);
    return door;
}