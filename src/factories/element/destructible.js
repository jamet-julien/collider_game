import Destructible from '../../class/destructible.js';
import Trait        from "../../class/trait.js";
import Destroy      from "../../trait/destroy.js";

class Hit extends Trait{

  constructor(subject) {
    super('hit');
    this.subject = subject;
  }

  distance( pointSub, pointCandi){
    let x = Math.abs( pointSub.x - pointCandi.x);
    let y = Math.abs( pointSub.y - pointCandi.y);
    return Math.sqrt( (x * x) + (y * y));
  }

  trigger( candidate) {
    let update = false;
    let pos    = candidate.mover.snapPos( candidate);
    let pixel  = this.subject.dataWorld.getCell( pos);

    if( pixel.length){

      for (let i = 0; i < pixel.length; i++){
        if (this.distance( candidate.pos, pixel[i]) <= candidate.radius){
          pixel[ i ].died = true;
          update          = true;
        }
      }

      if( update){
        //this.subject.updateBuffer();
        this.subject.updatePiece( pos);
      }

    }

  }

  update( entity) {

  }

}

export function createDestructible(conf, dataWorld) {


  function draw(context, cumulateTime) {
    context.drawImage(this.buffer, 0, 0);
  }

  return function destructibleElement() {

    let oDestructible = new Destructible({ dpi: conf.setting.dpi });


    if (conf.debug){
      oDestructible.activeDebug();
    }

    oDestructible.dataWorld = dataWorld;
    oDestructible.updateBuffer();

    oDestructible.addTrait( new Destroy());
    oDestructible.addTrait( new Hit( oDestructible));

    oDestructible.draw = draw.bind(oDestructible);
    

    return oDestructible;
  }
}