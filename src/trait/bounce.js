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

    oppositeVel( entity, candidat){

      if (Math.sign(candidat.mover.vel.x) != Math.sign(entity.mover.vel.x)) {

        entity.mover.vel.x *= -1;
        candidat.mover.vel.x *= -1;

        if (Math.sign(candidat.mover.vel.x) > 0) {
          candidat.bound.left = entity.bound.right;
        } else if (Math.sign(candidat.mover.vel.x) < 0) {
          candidat.bound.right = entity.bound.left;
        }

      }

      if (Math.sign( candidat.mover.vel.y) != Math.sign(entity.mover.vel.y)) {
        entity.mover.vel.y *= -1;
        candidat.mover.vel.y *= -1;

        if (Math.sign(candidat.mover.vel.y) > 0) {
          candidat.bound.top = entity.bound.bottom;
        } else if (Math.sign(candidat.mover.vel.y) < 0) {
          candidat.bound.bottom = entity.bound.top;
        }

      }

    }

    collide(entity, candidat) {
      let len = candidat.radius + entity.radius;

      if ( this.distance(candidat.pos, entity.pos) <= len) {
        this.oppositeVel( entity, candidat);
      }

    }

    update( entity){
      let randMov = .2, randMov2 = randMov*2;


      if (entity.bound.top <= 0){
        entity.mover.vel.y *= -1;

        if(Math.random()<.5){
          entity.mover.vel.x += ((Math.random() * randMov2) - randMov);
        }

        if (entity.bound.top <= 0) {
          entity.bound.top = 0;
        }

      }

      if (entity.bound.right >= this.width || entity.bound.left <= 0 ) {
        entity.mover.vel.x *= -1;

        if(Math.random()<.5){
          entity.mover.vel.y += ((Math.random() * randMov2) - randMov);
        }

        if (entity.bound.right >= this.width) {
          entity.bound.right = this.width;
        }

        if(entity.bound.left <= 0){
          entity.bound.left = 0;
        }
      
      }

      if (entity.bound.bottom >= (this.height + (entity.radius*2)) ){
        entity.died = true;

        if (entity.bound.bottom >= this.height) {
          entity.bound.bottom = this.height;
        }
       
      }

    }

}