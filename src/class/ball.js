import Vector      from "../utils/vector.js";
import BoundingBox from "./boundingbox.js";

export default class Ball{

    constructor({x, y, size}){
      this.pos     = new Vector( x, y);
      this.lastPos = this.pos.copy();
      this.traits  = [];
      this.grid    = 0;
      this.size    = new Vector( size*2,  size*2);
      this.radius  = Math.round(size);
      this.width   = size*2;
      this.offset  = new Vector( -size, -size);
      this.bound   = new BoundingBox( this.pos, this.size, this.offset);

      this.died    = false;
      this.event   = false;
    }

    getSegment() {
      let x1 = this.bound.left;
      let y1 = this.bound.top;

      let x2 = this.bound.right;
      let y2 = y1;

      let x3 = x2;
      let y3 = this.bound.bottom;

      let x4 = x1;
      let y4 = y3;

      return [
        { point1: { x: x1, y: y1 }, point2: { x: x2, y: y2 } },
        { point1: { x: x2, y: y2 }, point2: { x: x3, y: y3 } },
        { point1: { x: x3, y: y3 }, point2: { x: x4, y: y4 } },
        { point1: { x: x4, y: y4 }, point2: { x: x1, y: y1 } }
      ];

    }

    finalize() {
      this.traits.forEach(trait => {
        trait.finalize();
      });
    }

    addTrait( trait){

      this.traits.push( trait);
      this[trait.NAME] = trait;

    }

    update( freq){
      this.traits.map( (trait)=>{
        trait.update( this, freq);
      });
    }

}