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