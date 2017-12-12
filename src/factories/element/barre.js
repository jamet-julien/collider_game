import Trait                from "../../class/trait.js";
import Barre                from "../../class/barre.js";
import { intersectSegment}  from "../../utils/math.js";
import Vector               from "../../utils/vector.js";
import Rotate               from "../../trait/rotate.js";


class Hit extends Trait{

  constructor( subject) {
    super('hit');
    this.subject = subject;
  }

  getAngle( vector){
    let angle = 0;
    let { x, y } = vector.unit;

    if (x >= 0) {
      angle = Math.acos(y);
    } else {
      angle = -Math.acos(y);
    }

    return angle;
  }

  trigger( candidate) {

    if ( !candidate.mover){
      return ;
    }

    let segments       = candidate.getSegment(),
        segmentSubject = this.subject.segment,
        lenSeg         = segmentSubject.length,
        len            = segments.length;

    for (let i = 0; i < len ; i++){
      for (let j = 0; j < lenSeg; j++) {

        if (intersectSegment( segments[i], segmentSubject[j])){
          
          let x, y;
  
          if( this.subject.side == 'left'){
  
            x = segmentSubject[ j ].point2.x - segmentSubject[ j ].point1.x;
            y = segmentSubject[ j ].point2.y - segmentSubject[ j ].point1.y;
  
          }else{
  
            x = segmentSubject[ j ].point1.x - segmentSubject[ j ].point2.x;
            y = segmentSubject[ j ].point1.y - segmentSubject[ j ].point2.y;
  
          }
  
          let vector = new Vector( -y, x);
  
          vector.unit.mult( candidate.mover.max);  
          
          candidate.mover.vel.magnetude = candidate.mover.max;
          candidate.mover.vel.add( vector);
          
          return;

        }
      }
    }
  }

  update( entity) { }

}



export function createBarre(conf, { widthScene, heightScene }) {

  const TO_RADIAN = Math.PI / 180;

  function draw( context, cumulate){

    context.save();
    context.translate( this.pos.x, this.pos.y);

    context.rotate(this.angle * TO_RADIAN);

    context.fillStyle = `#FFF`;
    context.beginPath();

    context.rect(
      this.offset.x,//this.bound.left,
      this.offset.y,//this.bound.top,
      this.size.x,
      this.size.y
    );

    context.fill();
    context.closePath();

    context.restore();

  }

  function reset(){

  }

  return function barreElement({ width, height, x, y , angle}, event) {

    let barre = new Barre({ width, height, x, y, angle} , { widthScene, heightScene });

    barre.event = event;
    barre.addTrait( new Hit( barre));
    barre.addTrait( new Rotate( angle));

    barre.draw  = draw.bind( barre);
    barre.reset = reset.bind( barre);
    

    return barre;

  }

}
