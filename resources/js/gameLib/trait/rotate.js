import Trait  from "../class/trait.js";
import Vector from "../utils/vector.js";

export default class Rotate extends Trait{

    constructor( angle){
      super('rotate');

      this.amplitudeMax  = angle;
      this.timeLife      = 0;

      this.angle         = angle;
      this.disable       = false
    }

    update( entity, freq){

      this.angle   = Math.min( this.angle, this.amplitudeMax);
      this.angle   = Math.max( this.angle, 0);

      entity.angle = this.angle;

      if (!this.disable){
        this.angle  += (100 * freq);
      }else{
        this.angle  -= (300 * freq);
      }

    }

}