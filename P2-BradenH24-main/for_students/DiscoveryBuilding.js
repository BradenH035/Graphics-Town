import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";

let numDiscBuildings = 0;

export class DiscoveryBuilding extends GrObject {
    /**
     * 
     * @param {Number} x
     * @param {Number} y
     * @param {Number} z
     */
    constructor(params = {}) {
        let x = params.x || 0;
        let y = params.y || 20;
        let z = params.z || 0;

        let pi = Math.PI;
        let group = new T.Group();

        let vertices = [
            new T.Vector2(-20, 0), 
            new T.Vector2(20, 5),
            new T.Vector2(20, 25), 
            new T.Vector2(-20, 25)
        ];
        
        let shape = new T.Shape(vertices);
        
        let extrudeSettings = {
            depth: 20, 
            bevelEnabled: false 
        };
        let geometry = new T.ExtrudeGeometry(shape, extrudeSettings);        
        let m = new T.MeshStandardMaterial({color: 0xfff0db, side: T.DoubleSide});
        let base = new T.Mesh(geometry, m);
        group.add(base);
        base.rotateX(Math.PI/2);
        
        let verticesSide = [
            new T.Vector2(-20, 0),
            new T.Vector2(20, 0),
            new T.Vector2(20, 8),
            new T.Vector2(24, 8),
            new T.Vector2(24, 20),
            new T.Vector2(-24, 20),
            new T.Vector2(-24, 8),
            new T.Vector2(-20, 8)
        ];
        let side1Shape = new T.Shape(verticesSide)
        let extrudeSettingsSide = {
            depth: 2, 
            bevelEnabled: false 
        };

        let side1Geom = new T.ExtrudeGeometry(side1Shape, extrudeSettingsSide);
        let side1 = new T.Mesh(side1Geom, m);

        side1.position.set(0, -20, 0.5);
        group.add(side1);
        side1.rotateY(-pi/25)


        let side2 = new T.Mesh(side1Geom, m);
        side2.position.set(0, -20, 25);
        group.add(side2);
        group.position.set(x,y,z)

        let extrudingGroup1 = new T.Group();
        let extrudingPart1Geom = new T.BoxGeometry(10, 25, 10);
        let extrudingPart1 = new T.Mesh(extrudingPart1Geom, m);
        extrudingPart1.position.set(18, -7, 15);
        extrudingGroup1.add(extrudingPart1);

        let darkBlueTint = 0x65748e;

        let windowEG1 = windowMaker(8, 10, 0.2, darkBlueTint);
        windowEG1.position.set(23, -6, 15);
        windowEG1.rotateY(pi/2);
        extrudingGroup1.add(windowEG1);

        let gap = 2;
        let lPole = new T.CylinderGeometry(0.1, 0.1, 10, 32);
        let wPole = new T.CylinderGeometry(0.1, 0.1, 8, 32);
        let poleMat = new T.MeshStandardMaterial({color: 0xfff0db});

        for (let i = 0; i < 10; i += gap) {
            let pole = new T.Mesh(lPole, poleMat);
            pole.position.set(23.2, -6, 18 - i);
            group.add(pole);
        }
    
        for (let i = 0; i < 8; i += gap) {
            let pole = new T.Mesh(wPole, poleMat);
            pole.position.set(23.2, -3 - i, 15);
            pole.rotateX(Math.PI/2);
            group.add(pole);
        }
        
        group.add(extrudingGroup1);

    
        let extrudingPart2Geom = new T.BoxGeometry(10, 7, 10);
        let extrudingPart2 = new T.Mesh(extrudingPart2Geom, m);
        extrudingPart2.position.set(1, 2, 13);
        group.add(extrudingPart2);
        extrudingPart2.rotateY(-pi/12);
        
        let eg2 = new T.Group();
        let extrudingPart3Geom = new T.BoxGeometry(14, 25, 14);
        let extrudingPart3 = new T.Mesh(extrudingPart3Geom, m);
        extrudingPart3.position.set(-18, -7, 12);
        eg2.add(extrudingPart3);

        let windgowEG3 = windowMaker(12, 23, 0.2, darkBlueTint);
        windgowEG3.position.set(-25, -7, 12);
        windgowEG3.rotateY(-pi/2);
        eg2.add(windgowEG3);
        let lPole2 = new T.CylinderGeometry(0.1, 0.1, 23, 32);
        let wPole2 = new T.CylinderGeometry(0.1, 0.1, 12, 32);

        for (let i = 0; i < 10; i += gap) {
            let pole = new T.Mesh(lPole2, poleMat);
            pole.position.set(-25.2, -7, 16.5 - i);
            group.add(pole);
        }
    
        for (let i = 0; i < 22; i += gap) {
            let pole = new T.Mesh(wPole2, poleMat);
            pole.position.set(-25.2, 2 - i, 12);
            pole.rotateX(Math.PI/2);
            group.add(pole);
        }
        
        group.add(extrudingGroup1);
        
        group.add(eg2);

        let vertices2 = [
            new T.Vector2(-5, 2), 
            new T.Vector2(5, 3.5),
            new T.Vector2(5, 32), 
            new T.Vector2(-5, 32)
        ];
        let shape2 = new T.Shape(vertices2);
        
        let extrudeSettings2 = {
            depth: 1, 
            bevelEnabled: false 
        };
        let overhang1Geom = new T.ExtrudeGeometry(shape2, extrudeSettings2);        

        let m2 = new T.MeshStandardMaterial({color: 0xc0c0c0, side: T.DoubleSide});
        let overhang1 = new T.Mesh(overhang1Geom, m2);
        overhang1.rotateX(pi/2);
        overhang1.position.set(25, -11.5, 0);
        group.add(overhang1);

        let overhang2Geom = new T.BoxGeometry(45, 1, 6);
        let overhang2 = new T.Mesh(overhang2Geom, m2);
        overhang2.position.set(0, -12, 29);
        group.add(overhang2);

        let vertices3 = [
            new T.Vector2(-4, -5), 
            new T.Vector2(4, -3.5),
            new T.Vector2(4, 32), 
            new T.Vector2(-4, 32)
        ];
        let shape3 = new T.Shape(vertices3);
        
        let extrudeSettings3 = {
            depth: 1, 
            bevelEnabled: false 
        };
        let overhang3Geom = new T.ExtrudeGeometry(shape3, extrudeSettings3);
        let overhang3 = new T.Mesh(overhang3Geom, m2);
        overhang3.rotateX(pi/2);
        overhang3.position.set(-25, -11.5, 0);
        group.add(overhang3);

    
        let extruding4Group = new T.Group();
        let extrudingPart4Geom = new T.BoxGeometry(20, 8, 8);
        let extrudingPart4 = new T.Mesh(extrudingPart4Geom, m2);
        extrudingPart4.position.set(0, -10, 0);
        extruding4Group.add(extrudingPart4);

        // window for extruding part 4 (gray box)
        let window1Geom = new T.BoxGeometry(18, 6, 0.2);
        let window1 = new T.Mesh(window1Geom, new T.MeshStandardMaterial({color: darkBlueTint, side: T.DoubleSide, opacity: 0.5}));
        window1.position.set(0, -10, -4);
        extruding4Group.add(window1);
        extruding4Group.rotateY(-pi/23);

        for (let i = 0; i < 3; i++) {
            let row1 = windowMaker(2, 4, 0.2, darkBlueTint);
            row1.position.set(12 + 3.2 * i, -4, 0);
            extruding4Group.add(row1);

            let row2 = windowMaker(2, 4, 0.2, darkBlueTint);
            row2.position.set(12 + 3.2 * i, -9, 0);
            extruding4Group.add(row2);
        }

        for (let i = 0; i < 3; i++) {
            let row1 = windowMaker(2, 4, 0.2, darkBlueTint);
            row1.position.set(-19 + 3.2 * i, -4, 0);
            extruding4Group.add(row1);

            let row2 = windowMaker(2, 4, 0.2, darkBlueTint);
            row2.position.set(-19 + 3.2 * i, -9, 0);
            extruding4Group.add(row2);
        }

        let bigFrontWindowGeom = new T.BoxGeometry(40.5, 6, 0.2);
        let bigFrontWindow = new T.Mesh(bigFrontWindowGeom, new T.MeshStandardMaterial({color: darkBlueTint, side: T.DoubleSide, opacity: 0.5}));
        bigFrontWindow.position.set(0, -16, 0);
        extruding4Group.add(bigFrontWindow);

        let rightSideWindow = new T.BoxGeometry(25, 6, 0.2);
        let rightWindow = new T.Mesh(rightSideWindow, new T.MeshStandardMaterial({color: darkBlueTint, side: T.DoubleSide, opacity: 0.5}));
        rightWindow.position.set(20, -16, 15);
        rightWindow.rotateY(pi/2);
        group.add(rightWindow);

        let lowerBackWindowGeom = new T.BoxGeometry(40, 6, 0.2);
        let lowerBackWindow = new T.Mesh(lowerBackWindowGeom, new T.MeshStandardMaterial({color: darkBlueTint, side: T.DoubleSide, opacity: 0.5}));
        lowerBackWindow.position.set(0, -16, 27);
        group.add(lowerBackWindow);

        let lowerLeftWindowGeom = new T.BoxGeometry(30.2, 6, 0.2);
        let lowerLeftWindow = new T.Mesh(lowerLeftWindowGeom, new T.MeshStandardMaterial({color: darkBlueTint, side: T.DoubleSide, opacity: 0.5}));
        lowerLeftWindow.position.set(-20, -16, 12.5);
        lowerLeftWindow.rotateY(pi/2);
        group.add(lowerLeftWindow);
        for (let i = 0; i < 4; i++) {
            let pole = poleMaker(10,1, m2.color);
            pole.position.set(-8+ 5.5 * i, -15, -3);
            extruding4Group.add(pole);
        }

        let bigWindowGeom = new T.BoxGeometry(18, 4, 0.2);
        let bigWindow = new T.Mesh(bigWindowGeom, new T.MeshStandardMaterial({color: darkBlueTint, side: T.DoubleSide, opacity: 0.5}));
        bigWindow.position.set(0, -4, 0);
        extruding4Group.add(bigWindow);

        group.add(extruding4Group);

        // Window to backside
        let backWindowGeom = new T.BoxGeometry(40, 8, 0.2);
        let backWindow = new T.Mesh(backWindowGeom, new T.MeshStandardMaterial({color: darkBlueTint, side: T.DoubleSide, opacity: 0.5}));
        backWindow.position.set(0, -6, 27);
        group.add(backWindow);

        // poles to backside
        for (let i = 0; i < 7; i++) {
            let pole = poleMaker(8, 1, m2.color);
            pole.position.set(-27.5 + 9.2 * i, -16, 30);
            group.add(pole);
        }

        // Poles to left side
        for (let i = 0; i < 4; i++) {
            let pole = poleMaker(8, 1, m2.color);
            pole.position.set(-27.5, -16, -4 + 9 * i);
            group.add(pole);
        }

        // Pole to right side
        let rightPole = poleMaker(8, 1, m2.color);
        rightPole.position.set(28, -16, 5);
        group.add(rightPole);


        super(`DiscoveryBuilding-${++numDiscBuildings}`, group);
    }
}


function poleMaker(height, r, color) {
    let poleGeom = new T.CylinderGeometry(r, r, height, 32);
    let poleMat = new T.MeshStandardMaterial({color: color});
    let pole = new T.Mesh(poleGeom, poleMat);
    return pole;
}

function windowMaker(length, width, height, color = "lightblue") {
    let windowGeom = new T.BoxGeometry(length, width, height);
    let windowMat = new T.MeshStandardMaterial({color: color, side: T.DoubleSide, opacity: 0.5});
    let window = new T.Mesh(windowGeom, windowMat);
    return window;
}
