import Destructible from '../../class/destructible.js';
import Trait        from "../../class/trait.js";
import Destroy      from "../../trait/destroy.js";
import Vector       from '../../utils/vector.js';

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
        lenDied       = 0,
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
            this.subject.currentPixel++;
            pixelCollider.push( pixel[i]);
            update          = true;
          }
        } 
       
        
        if ( update){
              
          this.subject.event.emit('destructible.collide',
            [
              this.subject.currentPixel / this.subject.totalPixel,
              this.subject.currentPixel,
              this.subject.totalPixel
            ]);

          this.subject.pushPiece( posList[ index ]);
        }

  
      }

    });

    if( pixelCollider.length >= 2){

      let [ vec1, vec2] = this.getCouple( pixelCollider);
/*
      if (candidate.lastPos.x <= candidate.pos.x && candidate.lastPos.y <= candidate.pos.y){
        [vec1, vec2] = [vec2, vec1];
      }
*/
      let vector = new Vector( vec1.x, vec1.y);

      vector.sub( new Vector( vec2.x, vec2.y));

      let vectPer = new Vector( -vector.y, vector.x);
      
      vectPer.unit.mult( candidate.mover.vel.magnetude);
      candidate.mover.vel = vectPer.copy();
    
    }
    
    if (candidate.mover.vel.magnetude == 0) {
      candidate.mover.reset();
    }

    return true;

  }

  getCouple(pixelCollider){
    let coupleDist = [], calculated = [];

    pixelCollider.map((current) => {

      for (let i = 0; i < pixelCollider.length; i++) {

        if (current == pixelCollider[i]) {
          continue;
        }

        let couple = [current, pixelCollider[i]];
        couple.sort((a, b) => { b.x - a.x });

        let name = JSON.stringify(couple);

        if (!~calculated.indexOf(name)) {
          let distance = this.distance(current, pixelCollider[i]);

          calculated.push(name);
          coupleDist.push({
            couple,
            distance
          });
        }
      }

    });


    coupleDist.sort(function (a, b) { return b.distance - a.distance });

    return coupleDist[0].couple;
  }


  update( entity) {

  }

}

export function createDestructible( conf, dataWorld, getCrash) {

  
  function drawDebug(context, cumulateTime) {
    this.reDrawingBuffer();
    context.drawImage(this.buffer, 0, 0);
  }
  
  
  function draw( context, cumulateTime) {

    if( this.pieces.length){
      context.drawImage( this.drawCrash(), 0, 0);
    }

  }

  function drawInit(context) {
    context.drawImage( this.drawImageInit(), 0, 0);
  }


  function reset(){
    this.resetBuffer();
  }

  return function destructibleElement( event) {

    let oDestructible = new Destructible({ dpi: conf.setting.dpi, resolution: conf.setting.resolution});


    if (conf.debug){
      oDestructible.activeDebug();
    }

    oDestructible.event     = event;
    oDestructible.dataWorld = dataWorld;

    oDestructible.updateBuffer();

    oDestructible.bufferCrash = getCrash({ width: 50, height: 50 });

    oDestructible.addTrait( new Destroy());
    oDestructible.addTrait( new Hit( oDestructible, conf));

    oDestructible.drawDebug = drawDebug.bind( oDestructible);
    oDestructible.draw      = draw.bind( oDestructible);
    oDestructible.drawInit  = drawInit.bind( oDestructible);
    oDestructible.reset     = reset.bind( oDestructible);
  

    return oDestructible;
  }
}