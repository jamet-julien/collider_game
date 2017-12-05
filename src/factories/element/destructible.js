import Destructible from '../../class/destructible.js';
import Trait        from "../../class/trait.js";
import Destroy      from "../../trait/destroy.js";

class Hit extends Trait{

  constructor(subject, conf) {
    super('hit');
    this.subject = subject;
    this.debug   = conf.debug;
  }

  distance( pointSub, pointCandi){
    let x = Math.abs( pointSub.x - pointCandi.x);
    let y = Math.abs( pointSub.y - pointCandi.y);
    return Math.sqrt( (x * x) + (y * y));
  }

  trigger( candidate) {

    let update        = false,
        posList       = candidate.mover.snapPos( candidate),
        pixelList     = this.subject.dataWorld.getCellList( posList),
        currentPos    = candidate.pos,
        pixelCollider = [];

    pixelList.map( (pixel, index) => {

      if( pixel.length){
        for (let i = 0; i < pixel.length; i++){
          let distance   = this.distance( currentPos, pixel[i]) ;

          if (this.debug){
            pixel[i].color = `#0F0`;
          }

          if( !pixel[i].died && distance <= candidate.radius){
            pixel[ i ].died = true;
            pixelCollider.push( pixel[i]);
            update          = true;
          }
  
        }
  
        if( update){
          this.subject.pushPiece( posList[ index ]);
        }
  
      }

    });

    return pixelCollider.reduce(( accumulator, currentValue)=>{

      accumulator.x = Math.round((currentValue.x + accumulator.x)/2);
      accumulator.y = Math.round((currentValue.y + accumulator.y)/2);

      return accumulator;

    }, { x:0, y:0});

  }

  update( entity) {

  }

}

export function createDestructible(conf, dataWorld) {


  function draw(context, cumulateTime) {
    this.reDrawingBuffer();
    context.drawImage(this.buffer, 0, 0);
  }

  return function destructibleElement() {

    let oDestructible = new Destructible({ dpi: conf.setting.dpi, resolution: conf.setting.resolution});


    if (conf.debug){
      oDestructible.activeDebug();
    }

    oDestructible.dataWorld = dataWorld;
    oDestructible.updateBuffer();

    oDestructible.addTrait( new Destroy());
    oDestructible.addTrait(new Hit( oDestructible, conf));

    oDestructible.draw = draw.bind(oDestructible);
    

    return oDestructible;
  }
}