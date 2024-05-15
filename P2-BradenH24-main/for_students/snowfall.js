import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";

export class Snowfall extends GrObject {
    constructor(params = {}) {
        let snow = [];
        for (let i = 0; i < 2000; i++) {
            let snowflake = new T.Mesh(new T.SphereGeometry(0.3, 32, 32), new T.MeshStandardMaterial({color: 0xffffff}));
            snowflake.position.set(Math.random() * 200 - 100, Math.random() * 100, Math.random() * 200 - 100);
            snow.push(snowflake);
        }
        super("Snowfall", snow);
        this.snow = snow;
        this.u = 0;
    }
    stepWorld(delta, timeOfDay) {
        this.u = delta/100;
        for (let i = 0; i < this.objects.length; i++) {
            this.objects[i].position.y -= this.u;
            this.objects[i].position.x += Math.random() * 0.1 - 0.05;
            this.objects[i].position.z += Math.random() * 0.1 - 0.05;
            if (this.objects[i].position.y < 0) {
                this.objects[i].position.y = 100;
            }
        }
    }
}

