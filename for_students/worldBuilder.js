/*jshint esversion: 6 */
// @ts-check

//
// CS559 - Graphics Town - Workbook 12
// Example Code: 
// Example "Town"
//
// This sets up the town loading different objects. 
//
// It should be called from the onload function, after the world has been created

/** These imports are for the examples - feel free to remove them */
import { UnionSouth } from "../for_students/UnionSouth.js";
import { DiscoveryBuilding } from "./DiscoveryBuilding.js";
import { Road } from "./road.js";
import { Car } from "./car.js";
import { NewCSBuilding } from "./newCSBuilding.js";
import { GrExcavator, GrBackhoe, GrCrane, GrForklift} from "./constructionObjects.js"; // Excavator and Crane are sample CS559 code, but I thought they looked cool
import { GrHouse, GrRestaurant, GrTree, GrWideHouse} from "./buildings.js";
import { Snowfall } from "./snowfall.js";
import { Person } from "./person.js";  
import { PatioFurniture } from "./myShaderObject.js"
import { Bird } from "./bird.js";
import * as T from "../libs/CS559-Three/build/three.module.js";

export function main(world) {
    let usouth = new UnionSouth({x: 50, z: -40});
    let discoveryBuilding = new DiscoveryBuilding({x: 50, z: 40});
    let newCSBuilding = new NewCSBuilding({x: -40, z: 50});
    world.add(usouth);
    world.add(discoveryBuilding);
    world.add(newCSBuilding);

    let excavator = new GrExcavator({x: -75, y: 1, z: 45});
    excavator.objects[0].scale.set(7, 7, 7);
    excavator.objects[0].rotateY(1.2 *Math.PI/2);
    world.add(excavator);

    let backhoe = new GrBackhoe({x:-50, y:0,  z: 30});
    backhoe.objects[0].scale.set(7, 7, 7);
    backhoe.objects[0].rotateY(Math.PI);
    world.add(backhoe);

    let crane = new GrCrane({x: -10,y:1,  z: 40});
    crane.objects[0].scale.set(10, 10, 10);
    crane.objects[0].rotateY(Math.PI);
    world.add(crane);

    let forklift = new GrForklift({x: -30, z: 77});
    forklift.objects[0].scale.set(6, 6, 6);
    forklift.objects[0].rotateY(Math.PI/6);   

    world.add(forklift);
    
    let forklift2 = new GrForklift({x: -10, z: 50});
    forklift2.moveHorizontal = false;
    forklift2.objects[0].scale.set(6, 6, 6);
    forklift2.objects[0].rotateY(-Math.PI/2);
    world.add(forklift2);
    
    let road = new Road({x: -15, z: 0, length: 200, numLanes: 2});
    world.add(road);

    let turn1 = new Road({x: 92, z: 40, length: 110, numLanes: 2, xDir: false});
    turn1.objects[0].rotateY(Math.PI / 2);
    world.add(turn1);

    let turn2 = new Road({x: 95, z: 0, length: 200, numLanes: 2});
    world.add(turn2);

    let turn3 = new Road({x: -92, z: 40, length: 110, numLanes: 2, xDir: false});
    turn3.objects[0].rotateY(Math.PI / 2);
    world.add(turn3);

    let leftTurn1 = new Road({x: 92, z: -40, length: 105, numLanes: 2, xDir: false});
    leftTurn1.objects[0].rotateY(Math.PI / 2);
    world.add(leftTurn1);

    let leftTurn2 = new Road({x: -92, z: 0, length: 200, numLanes: 2});
    world.add(leftTurn2);

    let leftTurn3 = new Road({x: -92, z: -40, length: 105, numLanes: 2, xDir: false});
    leftTurn3.objects[0].rotateY(Math.PI / 2);
    world.add(leftTurn3);

    // Houses row 1
    for (let i = 0; i < 5; i++) {
        if (i % 2 == 0) { 
            let house = new GrHouse({x: -70 + 20 * i, y: 4, z: -70, height: 8, width: 8, depth: 8, color: 0x00ff00});
            world.add(house);

        }
        else{
            let wideHouse = new GrWideHouse({x: -70 + 20 * i, y: 4, z: -70, height: 8, width: 8, depth: 14, color: 0x00ff00});
            world.add(wideHouse);
        }
    }
        
    // Houses row 2
    for (let i = 0; i < 5; i++) {
        if (i % 2 == 0) {
            let wideHouse = new GrWideHouse({x: -70 + 20 * i, y: 4, z: -40, height: 8, width: 8, depth: 14, color: 0x00ff00});
            world.add(wideHouse);
        }
        else{
            let house = new GrHouse({x: -70 + 20 * i, y: 4, z: -40, height: 8, width: 8, depth: 8, color: 0x00ff00});
            world.add(house);
        }
    }

    // Train tracks
    let loader = new T.TextureLoader();
    let trackTexture = loader.load("../images/woodPanel.jpg");
    let trackMaterial = new T.MeshStandardMaterial({map: trackTexture});
    let trackGeometry = new T.BoxGeometry(3, 1, 10);
    for (let i = 0; i < 28; i++) {
        let panel = new T.Mesh(trackGeometry, trackMaterial);
        panel.position.set(-80 + 6 * i, 0.4, -6);
        world.scene.add(panel); 
    }
    
    // metal lines for track
    let metalTexture = loader.load("../images/Metal.jpg");
    let metalMaterial = new T.MeshStandardMaterial({map: metalTexture, color: 0xc0c0c0});
    let metalGeometry = new T.BoxGeometry(168, 0.1, 1);
    for (let i = 0; i < 2; i++) {
        let metal = new T.Mesh(metalGeometry, metalMaterial);
        metal.position.set(0, 0.4, -11 + 10 * i);
        world.scene.add(metal);
    }

    
    for (let i = 0; i < 4 ; i++) {
        // Formula for random color: https://css-tricks.com/snippets/javascript/random-hex-color/
        let randomColor = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
        let car = new Car({x: 30 + 20 * i, z: 8, color: randomColor, direction: -1});
        car.objects[0].scale.set(0.8, 0.8, 0.8);
        car.xDir = true;
        car.zDir = false;
        car.zDirection = -1;
        world.add(car);
    }

    for (let i = 0; i < 4; i++) {
        let randomColor = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
        let car = new Car({x: 30+ 20 * i, z: 18, color: randomColor, direction: -1, driveLeft: true});
        car.objects[0].scale.set(0.8, 0.8, 0.8);
        car.xDir = true;
        car.zDir = false;
        car.driveLeft = true;
        world.add(car);
    }

    let snowfall = new Snowfall();
    world.add(snowfall);

    //Place trees
    for (let i = 0; i < 6; i++) {
        let tree = new GrTree({x: 5 + 2 * i,y: 0.5, z: -15});
        tree.objects[0].scale.set(5, 5, 5);
        world.add(tree);
    }

    for (let i = 0; i < 4; i++) {
        let tree = new GrTree({x: 10 + 2 * i,y: 0.5, z: -13});
        tree.objects[0].scale.set(5, 5, 5);
        world.add(tree);
    }

    let person = new Person(world, { x: -30, y: 0, z: -20});
    world.add(person);
    let person2 = new Person(world, { x: 30, y: 0, z: -20});
    world.add(person2); 
    
    // Add shaderObject
    let furniture1 = new PatioFurniture({x: 48, y: 2, z: -26, size: 2, rotation: Math.PI/2});
    world.add(furniture1);

    let furniture2 = new PatioFurniture({x: 55, y: 2, z: -55, size: 2, rotation: Math.PI/2, numChairs:2});
    world.add(furniture2);

    let furniture3 = new PatioFurniture({x: 72, y: 2, z: -55, size: 2});
    world.add(furniture3);

    let furniture4 = new PatioFurniture({x: 65, y: 2, z: -28, size: 2, numChairs:2, rotation: Math.PI/2});
    world.add(furniture4);

    let bird = new Bird({x: 0, y: 20, z: 0, size: 2});
    world.add(bird);
}


