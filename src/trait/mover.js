import Trait  from "../class/trait.js";
import Vector from "../utils/vector.js";

export default class Mover extends Trait{

    constructor( x, y){
      super('mover');
      this.vel = new Vector( x, y); 
    }

    snapPos( entity) {

      return {
        x: Math.floor( entity.pos.x / entity.grid) * entity.grid,
        y: Math.floor( entity.pos.y / entity.grid) * entity.grid
      }

    }

    update( entity){
      entity.pos.add( this.vel);
    }

}