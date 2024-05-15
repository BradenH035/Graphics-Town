/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";

// Define your buildings here

let textureLoader = new T.TextureLoader();

// Load the texture image file
let b1Texture = textureLoader.load("../images/Brick.jpg");
let r1Texture = textureLoader.load('../images/Shingles.jpg')
// Create a material with the texture
let b1Mat = new T.MeshStandardMaterial({ map: b1Texture,  color: 0xFFBE7C, side: T.DoubleSide});
let r1Mat = new T.MeshStandardMaterial({ map: r1Texture, color: 0x964B00, side: T.DoubleSide});
let numHouses = 0;
export class GrHouse extends GrObject {
    constructor(params = {}) {
        let x = params.x || 0;
        let y = params.y || 0.5;
        let z = params.z || 0;
        let height = params.height || 2;
        let width = params.width || 2;
        let depth = params.depth || 2;


        let house = new T.Group();
        let buildingGeometry = new T.BoxGeometry(width, height, depth);
        let buildingMesh = new T.Mesh(buildingGeometry, b1Mat);
        buildingMesh.position.set(x, y, z);
        house.add(buildingMesh);

        // Create the roof geometry (a triangle)
        let roofGeometry = new T.BufferGeometry();
        let vertices = new Float32Array([
            // Back triangle
            -width / 2, height / 2, -depth / 2,    // Bottom left vertex
            width / 2, height / 2, -depth / 2,     // Bottom right vertex
            0, height, depth/8 - 1,                  // Top vertex

            // Right triangle
            width / 2, height / 2, -depth / 2,     
            width / 2, height / 2, depth / 2,      
            0, height, depth / 8 - 1,                 

            // Front triangle
            width / 2, height / 2, depth / 2,      
            -width / 2, height / 2, depth / 2,     
            0, height, depth / 8 - 1,          

            // Left triangle
            -width / 2, height / 2, depth / 2,     
            -width / 2, height / 2, -depth / 2,    
            0, height, depth / 8 - 1                 
        ]);
        let indices = new Uint32Array([
            0, 1, 2, // Back triangle
            3, 4, 5, // Right triangle
            6, 7, 8, // Front triangle
            9, 10, 11 // Left triangle
        ]); 
        roofGeometry.setAttribute('position', new T.BufferAttribute(vertices, 3));
        roofGeometry.setIndex(new T.BufferAttribute(indices, 1));

        let roofMesh = new T.Mesh(roofGeometry, r1Mat);
        roofMesh.position.set(x, y, z); 
        house.add(roofMesh);

        // Add Door
        let doorGeometry = new T.BoxGeometry(width/4, height/2, 0.1);
        let doorMat = new T.MeshStandardMaterial({ color: 0x8B4513 });
        let doorMesh = new T.Mesh(doorGeometry, doorMat);
        doorMesh.position.set(x, y-height/4, z + width/2);
        house.add(doorMesh);

        // Add Windows: front
        for (let i = 0; i < 2; i++) {
            let window = windowMaker(width/4, height/4, 0.1);
            window.position.set(x + (i - 0.5) * width/2, y + height/4, z + width/2);
            house.add(window);
        }

        // Left side
        for (let i = 0; i < 2; i++) {
            let window = windowMaker(0.1, height/4, width/4);
            window.position.set(x - width/2, y + height/4, z + (i - 0.5) * width/2);
            house.add(window);
        }

        // Back - top row
        for (let i = 0; i < 2; i++) {
            let window = windowMaker(width/4, height/4, 0.1);
            window.position.set(x + (i - 0.5) * width/2, y + height/4, z - width/2);
            house.add(window);
        }

        // Back - bottom row
        for (let i = 0; i < 2; i++) {
            let window = windowMaker(width/4, height/4, 0.1);
            window.position.set(x + (i - 0.5) * width/2, y - height/5, z - width/2);
            house.add(window);
        }

        // Right side
        for (let i = 0; i < 2; i++) {
            let window = windowMaker(0.1, height/4, width/4);
            window.position.set(x + width/2, y + height/4, z + (i - 0.5) * width/2);
            house.add(window);
        }
        super(`GrHouse${++numHouses}`, house);
    }
}

let b2Texture = textureLoader.load("../images/WhiteBrick.jpg");
let b2Mat = new T.MeshStandardMaterial({ map: b2Texture, color: 0xFFFFFF, side: T.DoubleSide });
let r2Texture = textureLoader.load('../images/SpanishRoof.jpg')
let r2Mat = new T.MeshStandardMaterial({ map: r2Texture, color: 0xFF0000, side: T.DoubleSide });
let numWideHouses = 0;
export class GrWideHouse extends GrObject {
    constructor(params = {}) {
        let x = params.x || 0;
        let y = params.y || 0;
        let z = params.z || 0;
        let height = params.height || 2;
        let width = params.width || 4;
        let depth = params.depth || 2;

        let house = new T.Group();
        let buildingGeometry = new T.BoxGeometry(width, height, depth);
        let buildingMesh = new T.Mesh(buildingGeometry, b2Mat);
        buildingMesh.position.set(x, y, z);
        house.add(buildingMesh);


        let roof = new T.Group();
        let vert1 = [
            new T.Vector2(-width / 2, 0),
            new T.Vector2(0, height / 2),
            new T.Vector2(width / 2, 0),
        ];
        let t1Shape = new T.Shape(vert1);
        let extrudeSettingsSide = {
            depth: 1, 
            bevelEnabled: false 
        };
        let t1Geom = new T.ExtrudeGeometry(t1Shape, extrudeSettingsSide);
        let t1 = new T.Mesh(t1Geom, r2Mat);
        t1.position.set(x, y+height/2, z-depth/2);

        let t2Shape = new T.Shape(vert1);
        let t2Geom = new T.ExtrudeGeometry(t2Shape, extrudeSettingsSide);
        let t2 = new T.Mesh(t2Geom, r2Mat);
        t2.position.set(x, y+height/2, z+depth/2 -1);
        roof.add(t1);
        roof.add(t2);

        let roofSideGeom = new T.BoxGeometry(0.2, 3*height/4, depth);
        let roofSideMesh = new T.Mesh(roofSideGeom, r2Mat);
        roofSideMesh.position.set(x-width/3.8, y + 3*height/4, z);
        roofSideMesh.rotateZ(-Math.PI/4);
        roof.add(roofSideMesh);

        let roofSideMesh2 = new T.Mesh(roofSideGeom, r2Mat);
        roofSideMesh2.position.set(x+width/3.8, y + 3*height/4, z);
        roofSideMesh2.rotateZ(Math.PI/4);
        roof.add(roofSideMesh2);

        // Add Door
        let doorGeometry = new T.BoxGeometry(width/4, height/2, 0.1);
        let doorMat = new T.MeshStandardMaterial({ color: 0x8B4513 });
        let doorMesh = new T.Mesh(doorGeometry, doorMat);
        doorMesh.position.set(x, y-height/4, z + depth/2);
        house.add(doorMesh);

        // Add Windows - front
        for (let i = 0; i < 2; i++) {
            let window = windowMaker(width/4, height/4, 0.1);
            window.position.set(x + (i - 0.5) * width/2, y + height/4, z + depth/2);
            house.add(window);
        }

        // Left side - top row
        for (let i = 0; i < 4; i++) {
            let window = windowMaker(0.1, height/4, width/4);
            window.position.set(x - width/2, y + height/4, z + (i - 1.5) * width/2);
            house.add(window);
        }
        // Left side - bottom row
        for (let i = 0; i < 4; i++) {
            let window = windowMaker(0.1, height/4, width/4);
            window.position.set(x - width/2, y - height/5, z + (i - 1.5) * width/2);
            house.add(window);
        }

        // Right side - top row
        for (let i = 0; i < 4; i++) {
            let window = windowMaker(0.1, height/4, width/4);
            window.position.set(x + width/2, y + height/4, z + (i - 1.5) * width/2);
            house.add(window);
        }

        // Right side - bottom row
        for (let i = 0; i < 4; i++) {
            let window = windowMaker(0.1, height/4, width/4);
            window.position.set(x + width/2, y - height/5, z + (i - 1.5) * width/2);
            house.add(window);
        }


        house.add(roof);

        super(`GrWideHouse${++numWideHouses}`, house);
    }
}

let b3Texture = textureLoader.load("../images/Brick.jpg");
let b3Mat = new T.MeshStandardMaterial({ map: b3Texture, color: 0xFFFFFF, side: T.DoubleSide });

let numRestaurants = 0;
export class GrRestaurant extends GrObject {
    constructor(params = {}) {
        let x = params.x || 0;
        let y = params.y || 0;
        let z = params.z || 0;
        let height = params.height || 1.5;
        let width = params.width || 2;
        let depth = params.depth || 2;
        let banner = params.banner || '../images/Subway.jpg';

        
        let restaurant = new T.Group();
        let baseGeometry = new T.BoxGeometry(width, height, depth);
        let baseMesh = new T.Mesh(baseGeometry, b3Mat);
        baseMesh.position.set(x, y, z);

        let roofGeometry = new T.BoxGeometry(width, 0.1, depth);
        let roofMesh = new T.Mesh(roofGeometry, r1Mat);
        roofMesh.position.set(x, y + height/2 + 0.05, z);
        restaurant.add(roofMesh);


        let poleGeometry = new T.CylinderGeometry(0.1, 0.1, height, 8);
        let poleMaterial = new T.MeshStandardMaterial({ color: 0x808080 });
        let pole1 = new T.Mesh(poleGeometry, poleMaterial);
        let pole2 = new T.Mesh(poleGeometry, poleMaterial);
        pole1.position.set(x - width / 2 + 0.2, y + height / 2, z + 0.8);
        pole2.position.set(x + width / 2 - 0.2, y + height / 2, z + 0.8);

        let bannerTexture = textureLoader.load(banner)
        let bannerMat = new T.MeshStandardMaterial({ map: bannerTexture, color: 0xFFFFFF, side: T.DoubleSide });

        let bannerGeometry = new T.BoxGeometry(1.6, 0.4, 0.1);
        let bannerMesh = new T.Mesh(bannerGeometry, bannerMat);
        bannerMesh.position.set(x, y + height, z + 0.8);
        restaurant.add(bannerMesh);

        restaurant.add(pole1, pole2);
        restaurant.add(baseMesh);



        super(`GrRestaurant${++numRestaurants}`, restaurant);
    }
    
}// into the "main" program

let numTrees = 0;
export class GrTree extends GrObject {
    constructor(params = {}) {
        let x = params.x || 0;
        let y = params.y || 0;
        let z = params.z || 0;

        let tree = new T.Group();
        let trunk = new T.Mesh(new T.CylinderGeometry(0.1, 0.1, 1, 8), new T.MeshStandardMaterial({ color: 0x8B4513 }));
        trunk.position.set(x, y, z);
        tree.add(trunk);
        let top = new T.Mesh(new T.ConeGeometry(0.5, 1.5, 8), new T.MeshStandardMaterial({ color: 0x00FF00 }));
        top.position.set(x, y + 1, z);
        tree.add(top);

        // Add snow
        let snow = new T.Mesh(new T.ConeGeometry(0.28, 0.8, 8), new T.MeshStandardMaterial({ color: 0xFFFFFF }));
        snow.position.set(x, y + 1.4, z);
        tree.add(snow);

        super(`GrTree${++numTrees}`, tree);
    }
}


function windowMaker(length, width, height) {
    let windowGeom = new T.BoxGeometry(length, width, height);
    let windowMat = new T.MeshStandardMaterial({color: "lightblue", side: T.DoubleSide, opacity: 0.5});
    let window = new T.Mesh(windowGeom, windowMat);
    return window;
}

