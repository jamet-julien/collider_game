import Vector      from "../utils/vector.js";
import BoundingBox from "./boundingbox.js";


export default class Barre{
  
  constructor( { width, height, x, y}, {widthScene, heightScene}){
    
      this.TO_RADIAN = -(Math.PI / 180);
      this.traits    = [];
      this.pos       = new Vector( x, y);
      this.size      = new Vector( width, height);
      this.sizeBound = new Vector( width, heightScene-y);

      this.angleReal   = 0;
      this.angleAdjust = 1;
      this.point1      = new Vector( x, y);
      
      if (this.pos.x > (widthScene/2)){
        this.side   = 'left';
        this.point2 = new Vector( x - width, y);
        this.offset = new Vector( -width, Math.round(height/-2));
        this.angleAdjust = -1;
      }else{
        this.side    = 'right';
        this.point2  = new Vector( x + width, y);
        this.offset  = new Vector( 0, Math.round(height/-2));
      }
      
      this.angle = 20;

      this.bound = new BoundingBox(this.pos, this.sizeBound, this.offset);
    }

    get angle(){
      return this.angleReal ;
    }

    set angle( angle){

      angle *= this.angleAdjust;

      this.angleReal = angle;

      angle -= 90;

      let x = Math.sin( angle * this.TO_RADIAN) * this.size.x;
      let y = Math.cos( angle * this.TO_RADIAN) * this.size.x;


      if (this.side == 'right'){
        this.point2    = this.point1.copy().add( new Vector( x, y));
      }else{
        this.point2    = this.point1.copy().sub( new Vector( x, y));
      }

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