import Trait  from "../class/trait.js";
import Vector from "../utils/vector.js";

export default class Bounce extends Trait{

    constructor({ width, height}){
      super('bounce');
      this.width  = width;
      this.height = height;
    }


    distance(pointSub, pointCandi) {
      let x = Math.abs(pointSub.x - pointCandi.x);
      let y = Math.abs(pointSub.y - pointCandi.y);
      return Math.sqrt((x * x) + (y * y));
    }


    collide( entity , candidate){
      let len = candidate.radius + entity.radius;

      if (this.distance(candidate.pos, entity.pos) <= len) {

        if (Math.sign(candidate.mover.vel.x) != Math.sign(entity.mover.vel.x)) {
          entity.mover.vel.x *= -1;
          candidate.mover.vel.x *= -1;

          if (Math.sign(candidate.mover.vel.x) > 0) {
            candidate.bound.left = entity.bound.right;
          } else if (Math.sign(candidate.mover.vel.x) < 0) {
            candidate.bound.right = entity.bound.left;
          }

        }

        if (Math.sign(candidate.mover.vel.y) != Math.sign(entity.mover.vel.y)) {
          entity.mover.vel.y *= -1;
          candidate.mover.vel.y *= -1;

          if (Math.sign(candidate.mover.vel.y) > 0) {
            candidate.bound.top = entity.bound.bottom;
          } else if (Math.sign(candidate.mover.vel.y) < 0) {
            candidate.bound.bottom = entity.bound.top;
          }

        }

      }

    }

    update( entity){

      if ( entity.bound.bottom >= this.height || entity.bound.top <= 0){
        entity.mover.vel.y *= -1;

        if (entity.bound.bottom >= this.height){
          entity.bound.bottom = this.height;
        }

        if (entity.bound.top <= 0) {
          entity.bound.top = 0;
        }

      }

      if ( entity.bound.right >= this.width || entity.bound.left <= 0 ) {
        entity.mover.vel.x *= -1;

          if(entity.bound.right >= this.width){
            entity.bound.right = this.width;
          }
          if(entity.bound.left <= 0){
            entity.bound.left = 0;
          }
        
      }

    }

}