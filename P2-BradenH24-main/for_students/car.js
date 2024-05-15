import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";

let numCars = 0;

export class Car extends GrObject {
    constructor(params = {}) {
        let x = params.x || 0;
        let y = params.y || 1;
        let z = params.z || 0;
        let color = params.color || "blue";

        let car = new T.Group();
        let vertices = [
            new T.Vector2(0, 0),
            new T.Vector2(5, 0),
            new T.Vector2(5, 3),
            new T.Vector2(4, 4),
            new T.Vector2(1, 4),
            new T.Vector2(0, 2.5),
            new T.Vector2(-2, 2.5),
            new T.Vector2(-2.5, 2),
            new T.Vector2(-2.5, 0.25),
            new T.Vector2(-2, 0)
        ];
        //let body = new T.BoxGeometry(5, 4, 4);
        let shape = new T.Shape(vertices);
        let extrudeSettings = {depth: 4, bevelEnabled: false};
        let body = new T.ExtrudeGeometry(shape, extrudeSettings);
        let bodyMat = new T.MeshStandardMaterial({color: color});
        let bodyMesh = new T.Mesh(body, bodyMat);
        car.add(bodyMesh);

        let wheelPositions = [[-1, 0], [4, 0], [-1, 4], [4, 4]];
        for (let [x, z] of wheelPositions) {
            let wheel = new T.Group();
            let cylinder = new T.CylinderGeometry(0.9, 0.9, 0.75, 32);
            let wheelMat = new T.MeshStandardMaterial({color: "black"});
            let wheelMesh = new T.Mesh(cylinder, wheelMat);
            wheelMesh.rotateX(Math.PI / 2);
            wheel.add(wheelMesh);
            wheel.position.set(x, 0, z);
            car.add(wheel);
        }
        let rimPositions = [[-1, -0.3], [4, -0.3], [-1, 4.3], [4, 4.3]];
        for (let [x, z] of rimPositions) {
            let rim = new T.Group();
            let torus = new T.CylinderGeometry(0.75, 0.75, 0.2, 32);
            let rimMat = new T.MeshStandardMaterial({color: "grey"});
            let rimMesh = new T.Mesh(torus, rimMat);
            rimMesh.rotateX(Math.PI / 2);
            rim.add(rimMesh);
            rim.position.set(x, 0, z);
            car.add(rim);
        }

        let frontWindow = windowMaker(3.4, 1.5, 0.2);
        frontWindow.position.set(0.5, 3.2, 2);
        frontWindow.rotateY(Math.PI / 2);
        frontWindow.rotateX(Math.PI / 6);
        car.add(frontWindow);

        let sideWindowGroup1 = new T.Group();
        let windowVerts = [
            new T.Vector2(3, 3),
            new T.Vector2(6, 3),
            new T.Vector2(5.5, 4),
            new T.Vector2(2.5, 4),
            new T.Vector2(1.6, 3)
        ];
        let extrudeSettings2 = {depth: 0.2, bevelEnabled: false};

        let windowShape = new T.Shape(windowVerts);
        let sideWindowGeom = new T.ExtrudeGeometry(windowShape, extrudeSettings2);
        let sideWindow1 = new T.Mesh(sideWindowGeom, new T.MeshStandardMaterial({color: 0x65748e, side: T.DoubleSide, opacity: 0.5}));
        sideWindow1.position.set(6.5, -0.2, 4.05);
        sideWindow1.rotateY(Math.PI);
        sideWindowGroup1.add(sideWindow1);


        let divide1 = new T.Mesh(new T.BoxGeometry(0.2, 4, 0.1), new T.MeshStandardMaterial({color: color}));
        divide1.position.set(2.25, 2, 4.05);
        sideWindowGroup1.add(divide1);

        let doorHandle1 = new T.Mesh(new T.CylinderGeometry(0.1, 0.1, 0.5, 32), new T.MeshStandardMaterial({color: "black"}));
        doorHandle1.position.set(2, 2, 4.1);
        sideWindowGroup1.add(doorHandle1);
        
        car.add(sideWindowGroup1);


        let sideWindowGroup2 = new T.Group();

        let windowShape2 = new T.Shape(windowVerts);
        let sideWindowGeom2 = new T.ExtrudeGeometry(windowShape2, extrudeSettings2);
        let sideWindow2 = new T.Mesh(sideWindowGeom2, new T.MeshStandardMaterial({color: 0x65748e, side: T.DoubleSide, opacity: 0.5}));
        sideWindow2.position.set(6.5, -0.2, 0.15);
        sideWindow2.rotateY(Math.PI);
        sideWindowGroup2.add(sideWindow2);

        let divide2 = new T.Mesh(new T.BoxGeometry(0.2, 4, 0.1), new T.MeshStandardMaterial({color: color}));
        divide2.position.set(2.25, 2, 0);
        sideWindowGroup2.add(divide2);

        let doorHandle2 = new T.Mesh(new T.CylinderGeometry(0.1, 0.1, 0.5, 32), new T.MeshStandardMaterial({color: "black"}));
        doorHandle2.position.set(2, 2, 0);
        sideWindowGroup2.add(doorHandle2);

        car.add(sideWindowGroup2);

        // Create grill of car
        let grillMat = new T.MeshStandardMaterial({color: 0x222222});
        for (let i = 0; i < 4; i++) {
            let grill = new T.Mesh(new T.CylinderGeometry(0.08, 0.08, 4), grillMat);
            grill.position.set(-2.5, 0.5+i*0.2, 2);
            grill.rotateX(Math.PI / 2);
            car.add(grill);
        }

        // Create lights
        let lightMat = new T.MeshStandardMaterial({color: "yellow"});
        let light1 = new T.Mesh(new T.BoxGeometry(0.5, 0.5, 0.2), lightMat);
        light1.position.set(-2.5, 1.5, 3.7);
        light1.rotateY(Math.PI / 2);
        car.add(light1);

        let light2 = new T.Mesh(new T.BoxGeometry(0.5, 0.5, 0.2), lightMat);
        light2.position.set(-2.5, 1.5, 0.3);
        light2.rotateY(Math.PI / 2);
        car.add(light2);


        car.position.set(x, y, z);
        super(`Car-${++numCars}`, car);
        this.ridePoint = new T.Object3D();
        this.ridePoint.rotation.y = -Math.PI / 2;
        this.ridePoint.position.set(8, 3, 2.5);
        this.objects[0].add(this.ridePoint);
        this.rideable = this.ridePoint;
        this.driveLeft = false;
        this.xDir = true;
        this.zDir = false;
        this.zDirection = 1;
        this.xDirection = -1;
        this.u = 0;

    }

    stepWorld(delta, timeOfDay) {
        this.u = delta / 30;
        if (this.driveLeft)
        {
            if (this.xDir) {
                this.objects[0].position.x += this.u * this.xDirection;
                if (this.objects[0].position.x - 0.1< -89) {
                        this.objects[0].rotateY(Math.PI/2);
                        this.xDir = false;
                        this.zDir = true;
                        this.xDirection *= -1;
                    }
                    else if (this.objects[0].position.x > 89) {
                        this.objects[0].rotateY(Math.PI/2);
                        this.xDir = false;
                        this.zDir = true;
                        this.xDirection *= -1;
                    }
                }
                else {
                    //console.log("here")
                    this.objects[0].position.z += this.u * this.zDirection;
                    if (this.objects[0].position.z > 89) {
                        this.objects[0].rotateY(Math.PI/2);
                        this.zDir = false;
                        this.xDir = true;
                        this.zDirection *= -1;
                    }
                    else if (this.objects[0].position.z - 0.1 < 18 && this.objects[0].position.x + 0.1 > 83.5) {
                        this.objects[0].rotateY(Math.PI/2);
                        this.zDir = false;
                        this.xDir = true;
                        this.zDirection *= -1;
                    }
                } 
            }
            else{
                if (this.xDir) {
                    this.objects[0].position.x += this.u * this.xDirection;
                    if (this.objects[0].position.x -0.1 < -85 && this.objects[0].position.z + 0.1 > -85) {
                        this.objects[0].rotateY(-Math.PI/2);
                        this.xDir = false;
                        this.zDir = true;
                        this.xDirection *= -1;
                    }
                    else if (this.objects[0].position.x + 0.1 > 85) {
                        this.objects[0].rotateY(-Math.PI/2);
                        this.xDir = false;
                        this.zDir = true;
                        this.xDirection *= -1;
                    }
                }
                else {
                   this.objects[0].position.z += this.u * this.zDirection;
                    if (this.objects[0].position.z < -87) {
                        this.objects[0].rotateY(-Math.PI/2);
                        this.zDir = false;
                        this.xDir = true;
                        this.zDirection *= -1;
                    }
                    else if (this.objects[0].position.z + 0.1 > 8 && this.objects[0].position.x + 0.1 > 83.5) {
                        this.objects[0].rotateY(-Math.PI/2);
                        this.zDir = false;
                        this.xDir = true;
                        this.zDirection *= -1;
                    }
                }
            }

        }
}

function windowMaker(length, width, height, color = "lightblue") {
    let windowGeom = new T.BoxGeometry(length, width, height);
    let windowMat = new T.MeshStandardMaterial({color: color, side: T.DoubleSide, opacity: 0.5});
    let window = new T.Mesh(windowGeom, windowMat);
    return window;
}