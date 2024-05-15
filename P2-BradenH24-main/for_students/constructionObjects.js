/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";

function degreesToRadians(deg) {
  return (deg * Math.PI) / 180;
}

let craneObCtr = 0;

// A simple crane
/**
 * @typedef CraneProperties
 * @type {object}
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [size=1]
 */
export class GrCrane extends GrObject {
  /**
   * @param {CraneProperties} params
   */
  constructor(params = {}) {
    let crane = new T.Group();

    let exSettings = {
      steps: 2,
      depth: 0.5,
      bevelEnabled: false
    };

    // first, we define the base of the crane.
    // Just draw a curve for the shape, then use three's "ExtrudeGeometry"
    // to create the shape itself.
    /**@type THREE.Shape */
    let base_curve = new T.Shape();
    base_curve.moveTo(-0.5, 0);
    base_curve.lineTo(-0.5, 2);
    base_curve.lineTo(-0.25, 2.25);
    base_curve.lineTo(-0.25, 5);
    base_curve.lineTo(-0.2, 5);
    base_curve.lineTo(-0.2, 5.5);
    base_curve.lineTo(0.2, 5.5);
    base_curve.lineTo(0.2, 5);
    base_curve.lineTo(0.25, 5);
    base_curve.lineTo(0.25, 2.25);
    base_curve.lineTo(0.5, 2);
    base_curve.lineTo(0.5, 0);
    base_curve.lineTo(-0.5, 0);
    let base_geom = new T.ExtrudeGeometry(base_curve, exSettings);
    let crane_mat = new T.MeshStandardMaterial({
      color: "yellow",
      metalness: 0.5,
      roughness: 0.7
    });
    let base = new T.Mesh(base_geom, crane_mat);
    crane.add(base);
    base.translateZ(-0.25);

    // Use a similar process to create the cross-arm.
    // Note, we create a group for the arm, and move it to the proper position.
    // This ensures rotations will behave nicely,
    // and we just have that one point to work with for animation/sliders.
    let arm_group = new T.Group();
    crane.add(arm_group);
    arm_group.translateY(4.5);
    let arm_curve = new T.Shape();
    arm_curve.moveTo(-1.5, 0);
    arm_curve.lineTo(-1.5, 0.25);
    arm_curve.lineTo(-0.5, 0.5);
    arm_curve.lineTo(4, 0.4);
    arm_curve.lineTo(4, 0);
    arm_curve.lineTo(-1.5, 0);
    let arm_geom = new T.ExtrudeGeometry(arm_curve, exSettings);
    let arm = new T.Mesh(arm_geom, crane_mat);
    arm_group.add(arm);
    arm.translateZ(-0.25);

    // Finally, add the hanging "wire" for the crane arm,
    // which is what carries materials in a real crane.
    // The extrusion makes this not look very wire-like, but that's fine for what we're doing.
    let wire_group = new T.Group();
    arm_group.add(wire_group);
    wire_group.translateX(3);
    let wire_curve = new T.Shape();
    wire_curve.moveTo(-0.25, 0);
    wire_curve.lineTo(-0.25, -0.25);
    wire_curve.lineTo(-0.05, -0.3);
    wire_curve.lineTo(-0.05, -3);
    wire_curve.lineTo(0.05, -3);
    wire_curve.lineTo(0.05, -0.3);
    wire_curve.lineTo(0.25, -0.25);
    wire_curve.lineTo(0.25, 0);
    wire_curve.lineTo(-0.25, 0);
    let wire_geom = new T.ExtrudeGeometry(wire_curve, exSettings);
    let wire_mat = new T.MeshStandardMaterial({
      color: "#888888",
      metalness: 0.6,
      roughness: 0.3
    });
    let wire = new T.Mesh(wire_geom, wire_mat);
    wire_group.add(wire);
    wire.translateZ(-0.25);

    // note that we have to make the Object3D before we can call
    // super and we have to call super before we can use this
    // This is also where we define parameters for UI sliders.
    // These have format "name," "min", "max", "starting value."
    // Sliders are standardized to have 30 "steps" per slider,
    // so if your starting value does not fall on one of the 30 steps,
    // the starting value in the UI may be slightly different from the starting value you gave.
    super(`Crane-${craneObCtr++}`, crane, [
      ["x", -4, 4, 0],
      ["z", -4, 4, 0],
      ["theta", 0, 360, 0],
      ["wire", 1, 3.5, 2],
      ["arm_rotation", 0, 360, 0]
    ]);
    // Here, we store the crane, arm, and wire groups as part of the "GrCrane" object.
    // This allows us to modify transforms as part of the update function.
    this.whole_ob = crane;
    this.arm = arm_group;
    this.wire = wire_group;

    // put the object in its place
    this.whole_ob.position.x = params.x ? Number(params.x) : 0;
    this.whole_ob.position.y = params.y ? Number(params.y) : 0;
    this.whole_ob.position.z = params.z ? Number(params.z) : 0;
    let scale = params.size ? Number(params.size) : 1;
    crane.scale.set(scale, scale, scale);
  }

  // Wire up the wire position and arm rotation to match parameters,
  // given in the call to "super" above.
  update(paramValues) {
    this.whole_ob.position.x = paramValues[0];
    this.whole_ob.position.z = paramValues[1];
    this.whole_ob.rotation.y = degreesToRadians(paramValues[2]);
    this.wire.position.x = paramValues[3];
    this.arm.rotation.y = degreesToRadians(paramValues[4]);
  }
}

let excavatorObCtr = 0;

// A simple excavator
/**
 * @typedef ExcavatorProperties
 * @type {object}
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [size=1]
 */
export class GrExcavator extends GrObject {
  /**
   * @param {ExcavatorProperties} params
   */
  constructor(params = {}) {
    let x = params.x || 0;
    let y = params.y || 0;
    let z = params.z || 0;
    let excavator = new T.Group();

    let exSettings = {
      steps: 2,
      depth: 0.4,
      bevelEnabled: true,
      bevelThickness: 0.2,
      bevelSize: 0.1,
      bevelSegments: 2
    };

    // As with the crane, we define the base (treads) of the excavator.
    // We draw a line, then extrude the line with ExtrudeGeometry,
    // to get the "cutout" style object.
    // Note, for this object, we translate each piece by 0.25 on the negative x-axis.
    // This makes rotation about the y-axis work nicely
    // (since the extrusion happens along +z, a y-rotation goes around an axis on the back face of the piece,
    //  rather than an axis through the center of the piece).
    /**@type THREE.Shape */
    let base_curve = new T.Shape();
    base_curve.moveTo(-1, 0);
    base_curve.lineTo(-1.2, 0.2);
    base_curve.lineTo(-1.2, 0.4);
    base_curve.lineTo(-1, 0.6);
    base_curve.lineTo(1, 0.6);
    base_curve.lineTo(1.2, 0.4);
    base_curve.lineTo(1.2, 0.2);
    base_curve.lineTo(1, 0);
    base_curve.lineTo(-1, 0);
    let base_geom = new T.ExtrudeGeometry(base_curve, exSettings);
    let excavator_mat = new T.MeshStandardMaterial({
      color: "yellow",
      metalness: 0.5,
      roughness: 0.7
    });
    let base = new T.Mesh(base_geom, excavator_mat);
    excavator.add(base);
    base.translateZ(-0.2);

    // We'll add the "pedestal" piece for the cab of the excavator to sit on.
    // It can be considered a part of the treads, to some extent,
    // so it doesn't need a group of its own.
    let pedestal_curve = new T.Shape();
    pedestal_curve.moveTo(-0.35, 0);
    pedestal_curve.lineTo(-0.35, 0.25);
    pedestal_curve.lineTo(0.35, 0.25);
    pedestal_curve.lineTo(0.35, 0);
    pedestal_curve.lineTo(-0.35, 0);
    let pedestal_geom = new T.ExtrudeGeometry(pedestal_curve, exSettings);
    let pedestal = new T.Mesh(pedestal_geom, excavator_mat);
    excavator.add(pedestal);
    pedestal.translateY(0.6);
    pedestal.translateZ(-0.2);

    // For the cab, we create a new group, since the cab should be able to spin on the pedestal.
    let cab_group = new T.Group();
    cab_group.name = "cabGroup";
    excavator.add(cab_group);
    cab_group.translateY(0.7);
    let cab_curve = new T.Shape();
    cab_curve.moveTo(-1, 0);
    cab_curve.lineTo(1, 0);
    cab_curve.lineTo(1.2, 0.35);
    cab_curve.lineTo(1, 0.75);
    cab_curve.lineTo(0.25, 0.75);
    cab_curve.lineTo(0, 1.5);
    cab_curve.lineTo(-0.8, 1.5);
    cab_curve.lineTo(-1, 1.2);
    cab_curve.lineTo(-1, 0);
    let cab_geom = new T.ExtrudeGeometry(cab_curve, exSettings);
    let cab = new T.Mesh(cab_geom, excavator_mat);
    cab_group.add(cab);
    cab.translateZ(-0.2);

    // Next up is the first part of the bucket arm.
    // In general, each piece is just a series of line segments,
    // plus a bit of extra to get the geometry built and put into a group.
    // We always treat the group as the "pivot point" around which the object should rotate.
    // It is helpful to draw the lines for extrusion with the zero at our desired "pivot point."
    // This minimizes the fiddling needed to get the piece placed correctly relative to its parent's origin.
    // The remaining few pieces are very similar to the arm piece.
    let arm_group = new T.Group();
    arm_group.name = "armGroup";
    cab_group.add(arm_group);
    arm_group.position.set(-0.8, 0.5, 0);
    let arm_curve = new T.Shape();
    arm_curve.moveTo(-2.25, 0);
    arm_curve.lineTo(-2.35, 0.15);
    arm_curve.lineTo(-1, 0.5);
    arm_curve.lineTo(0, 0.25);
    arm_curve.lineTo(-0.2, 0);
    arm_curve.lineTo(-1, 0.3);
    arm_curve.lineTo(-2.25, 0);
    let arm_geom = new T.ExtrudeGeometry(arm_curve, exSettings);
    let arm_mat = new T.MeshStandardMaterial({
      color: "#888888",
      metalness: 0.6,
      roughness: 0.3
    });
    let arm = new T.Mesh(arm_geom, arm_mat);
    arm_group.add(arm);
    arm.translateZ(-0.2);

    let forearm_group = new T.Group();
    forearm_group.name = "forearmGroup";
    arm_group.add(forearm_group);
    forearm_group.position.set(-2.1, 0, 0);
    let forearm_curve = new T.Shape();
    forearm_curve.moveTo(-1.5, 0);
    forearm_curve.lineTo(-1.5, 0.1);
    forearm_curve.lineTo(0, 0.15);
    forearm_curve.lineTo(0.15, 0);
    forearm_curve.lineTo(-1.5, 0);
    let forearm_geom = new T.ExtrudeGeometry(forearm_curve, exSettings);
    let forearm = new T.Mesh(forearm_geom, arm_mat);
    forearm_group.add(forearm);
    forearm.translateZ(-0.2);

    let bucket_group = new T.Group();
    bucket_group.name = "bucketGroup";
    forearm_group.add(bucket_group);
    bucket_group.position.set(-1.4, 0, 0);
    let bucket_curve = new T.Shape();
    bucket_curve.moveTo(-0.25, -0.9);
    bucket_curve.lineTo(-0.5, -0.5);
    bucket_curve.lineTo(-0.45, -0.3);
    bucket_curve.lineTo(-0.3, -0.2);
    bucket_curve.lineTo(-0.15, 0);
    bucket_curve.lineTo(0.1, 0);
    bucket_curve.lineTo(0.05, -0.2);
    bucket_curve.lineTo(0.5, -0.7);
    bucket_curve.lineTo(-0.25, -0.9);
    let bucket_geom = new T.ExtrudeGeometry(bucket_curve, exSettings);
    let bucket = new T.Mesh(bucket_geom, arm_mat);
    bucket_group.add(bucket);
    bucket.translateZ(-0.2);

    excavator.position.set(x, y, z);
    // note that we have to make the Object3D before we can call
    // super and we have to call super before we can use this
    // The parameters for sliders are also defined here.
    super(`Excavator-${excavatorObCtr++}`, excavator);
    // As with the crane, we save the "excavator" group as the "whole object" of the GrExcavator class.
    // We also save the groups of each object that may be manipulated by the UI.
    this.speeds = [0.01, 0.01, 0.03, 0.05];
    this.u = 0;
  }

  stepWorld(delta, timeOfDay) {
    let cabGroup = this.objects[0].children[2];
    let armGroup = cabGroup.children[1];
    let forearmGroup = armGroup.children[1];
    let bucketGroup = forearmGroup.children[1];
    this.u = delta / 100;
    bucketGroup.rotation.z += this.speeds[3] * this.u;
    if (bucketGroup.rotation.z > Math.PI/8) {
      this.speeds[3] *= -1;
    }
    else if (bucketGroup.rotation.z < -Math.PI/2) {
      this.speeds[3] *= -1;
    }

    forearmGroup.rotation.z += this.speeds[2] * this.u;
    if (forearmGroup.rotation.z + 0.05> 0.8) {
      this.speeds[2] *= -1;
    }
    else if (forearmGroup.rotation.z - 0.05< -0.7) {
      this.speeds[2] *= -1;
    }

    armGroup.rotation.z += this.speeds[1] * this.u;
    if (armGroup.rotation.z > Math.PI/6) {
      this.speeds[1] *= -1;
    }
    else if (armGroup.rotation.z < -Math.PI/6) {
      this.speeds[1] *= -1;
    }

    cabGroup.rotation.y += this.speeds[0]* this.u/3;
    if (cabGroup.rotation.y > Math.PI/15) {
      this.speeds[0] *= -1;
    }
    else if (cabGroup.rotation.y < -Math.PI/15) {
      this.speeds[0] *= -1;
    } 
  }
}

let forkliftCtr = 0;

// A simple excavator
/**
 * @typedef ForkliftProperties
 * @type {object}
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [size=1]
 */
export class GrForklift extends GrObject {
  /**
   * @param {ForkliftProperties} params
   */
  constructor(params = {}) {
    let x = params.x || 0;
    let y = params.y || 0;
    let z = params.z || 0;
  let forklift = new T.Group();
  let flSettings = {
    steps: 3,
    depth: 0.2,
    bevelEnabled: true,
    bevelThickness: 0.01,
    bevelSize: 0.1,
    bevelSegments: 2
  };
  let bodyMat = new T.MeshStandardMaterial({ color: "yellow", metalness: 1, roughness: 0.7 });
  let bodyGeom = new T.BoxGeometry(1, 1, 1);
  let body = new T.Mesh(bodyGeom, bodyMat);
  body.position.y = 0.6;
  forklift.add(body);

  let forkGroup = new T.Group();
  forklift.add(forkGroup);
  let forkMat = new T.MeshStandardMaterial({ color: "black", metalness: 1, roughness: 1 });
  let forkGeom = new T.Shape();
  forkGeom.moveTo(0.5, 0.2);
  forkGeom.lineTo(0.5, 0);
  forkGeom.lineTo(0.9, -0.1);
  let forkThis = new T.ExtrudeGeometry(forkGeom, flSettings)
  let fork = new T.Mesh(forkThis, forkMat);
  let fork2 = new T.Mesh(forkThis, forkMat);
  fork.position.y = 0.3;
  fork.position.z = 0.28;
  forkGroup.add(fork);
  
  fork2.position.y = 0.3;
  fork2.position.z = -0.48;
  forkGroup.add(fork2);
  forkGroup.name = "forkGroup";

  // Draw cage
  let bodyGroup = new T.Group();
  forklift.add(bodyGroup);
  bodyGroup.position.set(0,1.5,0);
  let poleMat = new T.MeshStandardMaterial({ color: "black", metalness: 1, roughness: 0.8 });
  let poleGeom = new T.CylinderGeometry(0.05, 0.05, 0.8, 32);
  let pole = new T.Mesh(poleGeom, poleMat);
  let pole2 = new T.Mesh(poleGeom, poleMat);
  let pole3 = new T.Mesh(poleGeom, poleMat);
  let pole4 = new T.Mesh(poleGeom, poleMat);
  pole.position.x = 0.42;
  pole.position.z = 0.42;

  pole2.position.x = -0.42;
  pole2.position.z = 0.42;

  pole3.position.x = 0.42;
  pole3.position.z = -0.42;

  pole4.position.x = -0.42;
  pole4.position.z = -0.42;
  bodyGroup.add(pole);
  bodyGroup.add(pole2);
  bodyGroup.add(pole3);
  bodyGroup.add(pole4);

  let roofGeom = new T.BoxGeometry(1, 0.05, 1);
  let roof = new T.Mesh(roofGeom, poleMat);
  roof.position.y = 0.4;
  bodyGroup.add(roof);    

  forklift.position.set(x, y, z);
  super(`Forklift-${forkliftCtr++}`, forklift);
  this.moveHorizontal = true;
  this.forkliftDirection = 1;
  this.forkYDir = 1;
  this.forkliftRotate = -1;
  //this.objects[0].children[1].position.y = 0.3;

  this.ridePoint = new T.Object3D();
  this.ridePoint.rotation.y = Math.PI / 2;
  this.ridePoint.position.set(0, 1, 0);
  this.objects[0].add(this.ridePoint);
  this.rideable = this.ridePoint;  
  }

  stepWorld(delta, timeOfDay) {
    
      if (this.moveHorizontal)
      {
        this.u = delta / 100;

          this.objects[0].position.x += this.u * this.forkliftDirection;
          if (this.objects[0].position.x - 2> -15) {
              this.forkliftDirection *= -1;
              this.objects[0].rotateY(Math.PI);

          }
          if(this.objects[0].position.x < -50) {
              this.forkliftDirection *= -1;
              this.objects[0].rotateY(Math.PI);

          }

          if (this.objects[0].children[1].name == "forkGroup") {
              this.objects[0].children[1].position.y += (this.u/20) * this.forkYDir;
              if (this.objects[0].children[1].position.y > 0.6) {
                  this.forkYDir *= -1;
              }
              if (this.objects[0].children[1].position.y < 0) {
                  this.forkYDir *= -1;
              }
          }
      }
      else{
        this.u = delta / 120;

          this.objects[0].position.z += this.u* this.forkliftDirection;
          if (this.objects[0].position.z - 2 < 48) {
              this.forkliftDirection *= -1;
              this.objects[0].rotation.y = -Math.PI/2;

          }
          if(this.objects[0].position.z + 2 > 72) {
              this.forkliftDirection *= -1;
              this.objects[0].rotation.y = Math.PI/2;

          }

          if (this.objects[0].children[1].name == "forkGroup") {
              this.objects[0].children[1].position.y += (this.u/20) * this.forkYDir;
              if (this.objects[0].children[1].position.y + 0.05 > 0.6) {
                  this.forkYDir *= -1;
              }
              if (this.objects[0].children[1].position.y + 0.05 < 0) {
                  this.forkYDir *= -1;
              }
          }
      }
  }
}


let backhoeCtr = 0;

// A simple excavator
/**
 * @typedef BackhoeProperties
 * @type {object}
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [size=1]
 */
export class GrBackhoe extends GrObject {
  /**
   * @param {BackhoeProperties} params
   */
  constructor(params = {}) {

  let x = params.x || 0;
  let y = params.y || 0;
  let z = params.z || 0;

  let backhoe = new T.Group();
  let bhSettings = {
    steps: 3,
    depth: 0.2,
    bevelEnabled: true,
    bevelThickness: 0.01,
    bevelSize: 0.1,
    bevelSegments: 2
  };
  let bodyMat = new T.MeshStandardMaterial({ color: "yellow", metalness: 1, roughness: 0.7 });
  let bodyGeom = new T.BoxGeometry(1.5, 1, 1);
  let body = new T.Mesh(bodyGeom, bodyMat);
  body.position.y = 0.6;
  backhoe.add(body);

  // Draw cage
  let bodyGroup = new T.Group();
  backhoe.add(bodyGroup);
  bodyGroup.position.set(-0.2,1.5,0);
  let poleMat = new T.MeshStandardMaterial({ color: "black", metalness: 1, roughness: 0.8 });
  let poleGeom = new T.CylinderGeometry(0.05, 0.05, 0.8, 32);
  let pole = new T.Mesh(poleGeom, poleMat);
  let pole2 = new T.Mesh(poleGeom, poleMat);
  let pole3 = new T.Mesh(poleGeom, poleMat);
  let pole4 = new T.Mesh(poleGeom, poleMat);
  pole.position.x = 0.42;
  pole.position.z = 0.42;

  pole2.position.x = -0.42;
  pole2.position.z = 0.42;

  pole3.position.x = 0.42;
  pole3.position.z = -0.42;

  pole4.position.x = -0.42;
  pole4.position.z = -0.42;
  bodyGroup.add(pole);
  bodyGroup.add(pole2);
  bodyGroup.add(pole3);
  bodyGroup.add(pole4);

  let windowMat = new T.MeshStandardMaterial({ color: "lightblue", opacity: 0.5, transparent: true });
  let windowGeom = new T.BoxGeometry(0.8, 0.8, 0.05);
  let window1 = new T.Mesh(windowGeom, windowMat);
  let window2 = new T.Mesh(windowGeom, windowMat);
  let window3 = new T.Mesh(windowGeom, windowMat);
  let window4 = new T.Mesh(windowGeom, windowMat);
  window1.position.z = 0.4;
  window2.position.z = -0.4;
  window3.position.x = 0.4;
  window3.rotateY(Math.PI / 2);
  window4.position.x = -0.4;
  window4.rotateY(Math.PI / 2);
  bodyGroup.add(window1);
  bodyGroup.add(window2);
  bodyGroup.add(window3);
  bodyGroup.add(window4);

  let roofGeom = new T.BoxGeometry(1, 0.05, 1);
  let roof = new T.Mesh(roofGeom, poleMat);
  roof.position.y = 0.4;
  bodyGroup.add(roof);
  

  // The following arm geometry contains code from the excavator arm code with modifications
  let armGroup = new T.Group();
  armGroup.name = "armGroup";
  backhoe.add(armGroup);
  armGroup.position.set(0.8, 0.9, 0);
  let armMat = new T.MeshStandardMaterial({ color: "black", metalness: 1, roughness: 0.8 });

let armGeom = new T.Shape();
    armGeom.moveTo(-0.2, 0.4);
    armGeom.lineTo(1.5, 0.6);
    armGeom.lineTo(1.8, 0.58);
    armGeom.lineTo(1.5, 0.54);
    armGeom.lineTo(0, 0.2);
  let armThis = new T.ExtrudeGeometry(armGeom, bhSettings)
  let arm = new T.Mesh(armThis, armMat);
  armGroup.add(arm);
  arm.scale.set(0.75, 0.75, 0.75);

  
  let forearmGroup = new T.Group();
  forearmGroup.name = "forearmGroup";
  armGroup.add(forearmGroup);
  forearmGroup.position.set(1, 0.2, 0);
  let forearmMat = new T.MeshStandardMaterial({ color: "black", metalness: 1, roughness: 0.8 });
  let forearmGeom = new T.Shape();
  forearmGeom.moveTo(-0.15, 0.4);
  forearmGeom.lineTo(1.3, 0.3);
  forearmGeom.lineTo(1.45, 0.28);
  forearmGeom.lineTo(1.5, 0.25);
  forearmGeom.lineTo(1.3, 0.3);
  forearmGeom.lineTo(0, 0.3);
  let forearmThis = new T.ExtrudeGeometry(forearmGeom, bhSettings)
  let forearm = new T.Mesh(forearmThis, forearmMat);
  forearm.scale.set(0.75, 0.75, 0.75);
  forearmGroup.add(forearm);

  let bucketGroup = new T.Group();
  bucketGroup.name = "bucketGroup";
  forearmGroup.add(bucketGroup);
  bucketGroup.position.set(0.8, 0, 0);
  let bucketMat = new T.MeshStandardMaterial({ color: "black", metalness: 1, roughness: 0.8 });
  let bucketGeom = new T.Shape();
    bucketGeom.moveTo(-0.15, 0.4);
    bucketGeom.lineTo(0.5, 0.2);
    bucketGeom.lineTo(0.6, 0);
    bucketGeom.lineTo(0.55, -0.15);
    bucketGeom.lineTo(0.4, -0.2);
    bucketGeom.lineTo(0.1, -0.2);
    bucketGeom.lineTo(0.32, 0.07);
    bucketGeom.lineTo(0.3, 0.15);
    bucketGeom.lineTo(0.28, 0.2);
    bucketGeom.lineTo(0, 0.4);


  let bucketThis = new T.ExtrudeGeometry(bucketGeom, bhSettings)
  let bucket = new T.Mesh(bucketThis, bucketMat);
  bucketGroup.add(bucket);

  let dozerSettings = {
    steps: 2,
    depth: 1,
    bevelEnabled: false
  }
  let dozerMat = new T.MeshStandardMaterial({ color: "black", metalness: 1, roughness: 0.8 });
  let dozerGeom = new T.Shape();
  dozerGeom.moveTo(0, 0.4);
  dozerGeom.lineTo(0, 0);
  dozerGeom.lineTo(-0.7, 0);
  dozerGeom.lineTo(0, 0.4);
  let dozerThis = new T.ExtrudeGeometry(dozerGeom, dozerSettings)
  let dozer = new T.Mesh(dozerThis, dozerMat);
  dozer.translateY(-1.4);
  dozer.translateX(-0.5);
  dozer.translateZ(-0.5);
  bodyGroup.add(dozer);
  backhoe.position.set(x, y, z);
  super(`Backhoe-${backhoeCtr++}`, backhoe);
  
  this.speeds = [-0.1, -0.15, -0.5];
  this.u = 0;
  forearmGroup.rotation.z = 0;
  bucketGroup.rotation.z = -0.2;
  armGroup.rotation.z = -0.2;
  }

  stepWorld(delta, timeOfDay) {

    this.u = delta / 500;
    
    let armGroup = this.objects[0].children[2];
    let forearmGroup = armGroup.children[1];
    let bucketGroup = forearmGroup.children[1];

    bucketGroup.rotation.z += this.speeds[2] * this.u;

    if (bucketGroup.rotation.z + 0.05 > 0.4) {
      this.speeds[2] *= -1;
    }
    else if (bucketGroup.rotation.z - 0.05 < -0.8) {
      this.speeds[2] *= -1;
    }

    forearmGroup.rotation.z += this.speeds[1] * this.u;
    if (forearmGroup.rotation.z + 0.05 > 0.4) {
      this.speeds[1] *= -1;
    }
    else if (forearmGroup.rotation.z - 0.05 < -0.75) {
      this.speeds[1] *= -1;
    }

    armGroup.rotation.z += this.speeds[0] * this.u;
    if (armGroup.rotation.z + 0.05 > 0.4) {
      this.speeds[0] *= -1;
    }
    else if (armGroup.rotation.z - 0.05 < -0.6) {
      this.speeds[0] *= -1;
    }
  }
}


