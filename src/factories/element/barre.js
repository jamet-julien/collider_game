import Trait                from "../../class/trait.js";
import Barre                from "../../class/barre.js";
import { intersectSegment}  from "../../utils/math.js";
import Vector               from "../../utils/vector.js";


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
        segmentSubject = { point1: this.subject.point1, point2: this.subject.point2 },
        len            = segments.length;

    for (let i = 0; i < len ; i++){

      if( intersectSegment( segments[ i ], segmentSubject)){
        let x, y;
        if( this.subject.side == 'left'){
          x = this.subject.point2.x - this.subject.point1.x;
          y = this.subject.point2.y - this.subject.point1.y;
        }else{
          x = this.subject.point1.x - this.subject.point2.x;
          y = this.subject.point1.y - this.subject.point2.y;
        }

        let vector = new Vector( -y, x);

        vector.unit.mult( candidate.mover.max);        
        candidate.mover.vel = vector;
        return;
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

  return function barreElement({ width, height, x, y , angle}) {

    let barre = new Barre({ width, height, x, y, angle} , { widthScene, heightScene });


    barre.addTrait( new Hit(barre));

    barre.draw = draw.bind( barre);
    

    return barre;

  }

}
