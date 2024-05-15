import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";

let numBirds = 0;
export class Bird extends GrObject{
    constructor(params = {}) {
        let x = params.x || 0;
        let y = params.y || 40;
        let z = params.z || 0;
        let size = params.size || 2;

        let bird = new T.Group();
        let body = new T.Group();
        let head = new T.Group();
        let tail = new T.Group();
        let wing1 = new T.Group();
        let wing2 = new T.Group();
  

        // build body, oval shape
        let bodyVertices = [
            new T.Vector2(0, 0),
            new T.Vector2(1, 0),
            new T.Vector2(1.2, 0.2),
            new T.Vector2(1.3, 0.4),
            new T.Vector2(1.2, 0.6),
            new T.Vector2(1, 0.8),
            new T.Vector2(-1, 0.8),
            new T.Vector2(-1.2, 0.6),
            new T.Vector2(-1.3, 0.4),
            new T.Vector2(-1.2, 0.2),
            new T.Vector2(-1, 0),
            new T.Vector2(0, 0)
        ]
        let bodyGeom = new T.Shape(bodyVertices);
        let bodyExtrudeSettings = {
            steps: 2,
            depth: 0.5,
            bevelEnabled: true,
            bevelThickness: 0.1,
            bevelSize: 0.1,
            bevelOffset: 0,
            bevelSegments: 1
        };
        let bodyGeometry = new T.ExtrudeGeometry(bodyGeom, bodyExtrudeSettings);
        let bodyMaterial = new T.MeshStandardMaterial({color: 0x607B94,});
        let bodyMesh = new T.Mesh(bodyGeometry, bodyMaterial);
        bodyMesh.scale.set(size, size, size);
        body.add(bodyMesh);

        // build head, circle shape
        let headGeom = new T.SphereGeometry(size/3, 32, 32);
        let headMaterial = new T.MeshStandardMaterial({color: 0x607B94});
        let headMesh = new T.Mesh(headGeom, headMaterial);
        headMesh.scale.set(size, size, size);
        head.add(headMesh);

        // build tail, triangle shape
        let tailVertices = [
            new T.Vector2(0, 0),
            new T.Vector2(0.5, 1),
            new T.Vector2(1, 0),
            new T.Vector2(0, 0)
        ]
        let tailGeom = new T.Shape(tailVertices);
        let tailExtrudeSettings = {
            steps: 2,
            depth: 0.2,
            bevelEnabled: true,
            bevelThickness: 0.1,
            bevelSize: 0.1,
            bevelOffset: 0,
            bevelSegments: 1
        };
        let tailGeometry = new T.ExtrudeGeometry(tailGeom, tailExtrudeSettings);
        let tailMaterial = new T.MeshStandardMaterial({color: 0x607B94});
        let tailMesh = new T.Mesh(tailGeometry, tailMaterial);
        tailMesh.position.set(0, 0, 0);
        tailMesh.scale.set(size, size, size);
        tail.add(tailMesh);

        // build wings
        let wingVertices = [
            new T.Vector2(0,0),
            new T.Vector2(1, 0),
            new T.Vector2(1.2, 0.1),
            new T.Vector2(1.35, 0.15),
            new T.Vector2(1.4, 0.3),
            new T.Vector2(1.35, 0.45),
            new T.Vector2(1.2, 0.5),
            new T.Vector2(1, 0.6),
            new T.Vector2(0, 0.6),
        ]

        let wingGeom = new T.Shape(wingVertices);
        let wingExtrudeSettings = {
            steps: 2,
            depth: 0.2,
            bevelEnabled: true,
            bevelThickness: 0.1,
            bevelSize: 0.1,
            bevelOffset: 0,
            bevelSegments: 1
        };
        let wingGeometry = new T.ExtrudeGeometry(wingGeom, wingExtrudeSettings);
        let wingMaterial = new T.MeshStandardMaterial({color: 0x607B94});
        let wingMesh1 = new T.Mesh(wingGeometry, wingMaterial);
        wingMesh1.position.set(0, 0, 0);
        wingMesh1.scale.set(size, size, size);
        wing1.add(wingMesh1);

        let wingMesh2 = new T.Mesh(wingGeometry, wingMaterial);
        wingMesh2.position.set(0, 0, 0);
        wingMesh2.scale.set(size, size, size);
        wing2.add(wingMesh2);

        // position the body, head, tail, and wings
        body.position.set(0, 0, 0);
        head.position.set(1.3*size, 1, 0.5);
        tail.position.set(-2* size, size/2, 0.8*size);
        tail.rotateX(Math.PI / 2);
        tail.rotateZ(-Math.PI / 2);

        wing1.position.set(0, size/2, -0.2*size);
        wing1.rotateX(Math.PI / 2);
        wing1.rotateZ(-Math.PI / 2);
        wing2.position.set(0.6*size, size/2, 0.7*size);
        wing2.rotateX(Math.PI / 2);
        wing2.rotateZ(Math.PI / 2);

        bird.add(body);
        bird.add(head);
        bird.add(tail);
        bird.add(wing1);
        bird.add(wing2);


        // Add orange beak
        let beakGeom = new T.ConeGeometry(size/4, size/2, 32);
        let beakMaterial = new T.MeshStandardMaterial({color: 0xFFA500});
        let beakMesh = new T.Mesh(beakGeom, beakMaterial);
        beakMesh.position.set(2*size, 1, 0.5);
        beakMesh.rotateX(Math.PI / 2);
        beakMesh.rotateZ(-Math.PI / 2);
        bird.add(beakMesh);

        bird.position.set(x, y, z);
        bird.rotateY(Math.PI);
        super(`Bird-${numBirds++}`, bird);
        this.u = 0;
        this.ridePoint = new T.Object3D();
        this.ridePoint.position.set(0, 1, 0);
        this.ridePoint.rotation.set(0, Math.PI/2, 0);
        this.objects[0].add(this.ridePoint);
        this.rideable = this.ridePoint;
    }

    stepWorld(delta, timeOfDay) {
        // Move bird in circle and up and down
        this.u += delta / 1000; 
        let height = 50; 
        let radius = 75;

        let x = radius * Math.cos(this.u);
        let y = height + 30*Math.sin(this.u); 
        let z = radius * Math.sin(this.u);

        this.objects[0].position.set(x, y, z);
        let tangentVector = new T.Vector3(
            -radius * Math.sin(this.u), // dx/du
            2 * Math.cos(2 * this.u),   // dy/du
            radius * Math.cos(this.u)   // dz/du
        ).normalize();
    
        let rotationQuaternion = new T.Quaternion().setFromUnitVectors(
            new T.Vector3(1, 0, 0), // Up direction
            tangentVector
        );
    
        this.objects[0].quaternion.copy(rotationQuaternion);
    }
}