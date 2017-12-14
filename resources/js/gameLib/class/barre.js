import Vector      from "../utils/vector.js";
import BoundingBox from "./boundingbox.js";


export default class Barre{
  
  constructor({ width, height, x, y, angle}, {widthScene, heightScene}){

    let middleHeight = Math.round(height / 2);
    let stepSegment  = 6;

      this.TO_RADIAN = -(Math.PI / 180);
      this.traits    = [];
      this.pos       = new Vector( x, y);
      this.size      = new Vector( width, height);
      this.sizeBound = new Vector( width, heightScene-y);

      this.segment     = [];

      this.angleReal    = 0;
      this.angleAdjust  = 1;
      this.amplitudeMax = angle;

      if (this.pos.x > (widthScene/2)){
        this.side        = 'left';
        this.offset      = new Vector( -width, Math.round(height/-2));
        this.angleAdjust = -1;
      }else{
        this.side        = 'right';
        this.offset      = new Vector( 0, Math.round(height/-2));
      }

    for (let i = -middleHeight; i <= middleHeight; i += stepSegment ){
        this.buildSegment( x, y+i);
      }

      
      this.angle = angle;
      this.bound = new BoundingBox(this.pos, this.sizeBound, this.offset);
    }

    buildSegment( XOrig, YOrig){
      
      let x = (this.side == 'left') ? XOrig - this.size.x : XOrig + this.size.x;
      let y = YOrig;

      let point1 = new Vector( XOrig, YOrig);
      let point2 = new Vector( x, y);

      this.segment.push(
        { point1, point2 }
      );

    };



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

        this.segment.map( (seg) => {
          seg.point2    = seg.point1.copy().add( new Vector( x, y));
        });


      }else{
        this.segment.map((seg) => {
          seg.point2    = seg.point1.copy().sub( new Vector( x, y));
        });
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