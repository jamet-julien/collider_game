import Trait  from "../class/trait.js";
import Vector from "../utils/vector.js";

export default class Mover extends Trait{

    constructor( x, y){
      super('mover');
      this.x = x;
      this.y = y;
      this.vel     = new Vector( x, y); 

      this.vel.magnetude = 300;

      this.lastVel = this.vel.copy();

      this.min = this.vel.magnetude;
      this.max = ( this.vel.magnetude * 2);


      this.gravity = new Vector( 0, .1);
    }

    reset(){
      this.vel = new Vector( this.x, this.y); 
    }

    snapPos( entity) {
      let posList  = [],
          lib      = [];

      let x1  = Math.floor( (entity.bound.left) / entity.grid) * entity.grid;
      let y1  = Math.floor( (entity.bound.top) / entity.grid) * entity.grid;
      let obj = { x: x1, y: y1 };
      let ref = `${obj.x}${obj.y}`;

      lib.push(ref);
      posList.push(obj);
      

      let x2 = Math.floor( (entity.bound.right) / entity.grid) * entity.grid;
      let y2 = y1;
      obj = { x: x2, y: y2 };
      ref = `${obj.x}${obj.y}`;

      if (!~lib.indexOf(ref)){
        lib.push(ref);
        posList.push(obj);
      }

      let x3 = x2;
      let y3 = Math.floor((entity.bound.bottom) / entity.grid) * entity.grid;
      obj = { x: x3, y: y3 };
      ref = `${obj.x}${obj.y}`;

      if (!~lib.indexOf(ref)) {
        lib.push(ref);
        posList.push(obj);
      }

      let x4 = x1;
      let y4 = y3;

      obj = { x: x4, y: y4 };
      ref = `${obj.x}${obj.y}`;

      if (!~lib.indexOf(ref)) {
        lib.push(ref);
        posList.push(obj);
      }

      return posList;

    }

    update( entity, freq){
      
      //entity.pos.add( this.vel);

      this.vel.magnetude *= .999;

      this.vel.limitMax( this.max);
      this.vel.limitMin( this.min);

      this.vel.add( this.gravity);


      entity.pos.x += ( this.vel.x * freq);
      entity.pos.y += ( this.vel.y * freq);

    }

}