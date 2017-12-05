import Vector from '../utils/vector.js';
import BoundingBox from "./boundingbox.js";

export default class Destructible{

  constructor( {dpi}){
      this.pos       = new Vector( 0, 0);
      this.lifeTime  = 0;
      this.dataWorld = {};
      this.traits    = [];
      this.buffer    = document.createElement('canvas');
      this.context   = this.buffer.getContext('2d');

      this.size      = new Vector(0, 0);
      this.offset    = new Vector(0, 0);

      this.sizePix   = dpi * 2;
      this.offsetPix = dpi;

      this.bound     = new BoundingBox( this.pos, this.size, this.offset);

      this.color     = '#FFF';
      this.colorDied = '#000';

  }

  activeDebug(){
    this.sizePix     = 2;
    this.colorDied   = '#F00';
  }

  updatePiece( pos){
    let buffer  = document.createElement('canvas'),
        context = buffer.getContext('2d');

    buffer.x    = this.dataWorld.width;
    buffer.y    = this.dataWorld.height;

    for (let { x, y, died } of this.dataWorld.getCell( pos)) {

      let _x = x - pos.x;
      let _y = y - pos.y;

      context.fillStyle = (died) ? this.colorDied : this.color ;
      context.beginPath();
      context.rect( _x - this.offsetPix, _y - this.offsetPix, this.sizePix, this.sizePix);
      context.fill();
    }

    this.context.drawImage( buffer, pos.x, pos.y);
    this.context.drawImage( this.dataWorld.buffer, 0, 0);

  }


  updateBuffer(){
    
    this.buffer.width  = this.dataWorld.width;
    this.buffer.height = this.dataWorld.height;

    this.size.x        = this.dataWorld.width;
    this.size.y        = this.dataWorld.height;
    
    for (let { x, y, died } of this.dataWorld.getCoordonate()) {
  
      this.context.fillStyle = this.color ;
      this.context.beginPath();
      this.context.rect(x - this.offsetPix, y - this.offsetPix, this.sizePix, this.sizePix);
      this.context.fill();
    }

    this.context.drawImage( this.dataWorld.buffer, 0, 0);
    this.context.drawImage( this.dataWorld.buffer, 0, 0);

  }

  addTrait( trait) {
    this.traits.push( trait);
    this[trait.NAME] = trait;
  }


  finalize() {
    this.traits.forEach(trait => {
      trait.finalize();
    });
  }


  update( deltaTime){

    this.traits.map(( trait)=>{

      trait.update( this, deltaTime);

    });

    this.lifeTime += deltaTime;
  }



}