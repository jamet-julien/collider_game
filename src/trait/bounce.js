import Trait  from "../class/trait.js";
import Vector from "../utils/vector.js";

export default class Bounce extends Trait{

    constructor({ width, height}){
      super('bounce');
      this.width  = width;
      this.height = height;
    }

    update( entity){

      if ( entity.bound.bottom >= this.height || entity.bound.top <= 0){
        entity.mover.vel.y *= -1;
      }

      if ( entity.bound.right >= this.width || entity.bound.left <= 0 ) {
        entity.mover.vel.x *= -1;
      }

    }

}