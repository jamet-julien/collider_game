import Vector from '../utils/vector.js';
import BoundingBox from "./boundingbox.js";

export default class Destructible{

  constructor({ dpi, resolution}){
      this.pos         = new Vector( 0, 0);
      this.lifeTime    = 0;
      this.dataWorld   = {};
      this.traits      = [];
      this.buffer      = document.createElement('canvas');
      this.bufferCrash = false;
      this.context     = this.buffer.getContext('2d');


      this.totalPixel   = 0;
      this.currentPixel = 0;

      this.size   = new Vector(0, 0);
      this.offset = new Vector(0, 0);

      this.sizePix    = dpi * 2;
      this.offsetPix  = dpi;
      this.resolution = resolution;

      this.bound = new BoundingBox( this.pos, this.size, this.offset);

      this.color     = '#FFF';
      this.colorDied = '#000';

      this.pieces = [];
      this.debug  = false;

  }

  drawImageInit() {

    let buffer = document.createElement('canvas'),
       context = buffer.getContext('2d');


    buffer.width = this.dataWorld.width;
    buffer.height = this.dataWorld.height;

    context.fillStyle = '#FFF';
    context.beginPath();
    context.rect(0, 0, this.dataWorld.width, this.dataWorld.height);
    context.fill();
    context.closePath();

    context.drawImage( this.dataWorld.buffer, 0, 0);

    return buffer;
  }

  activeDebug(){
    this.debug       = true;
    this.sizePix     = 2;
    this.colorDied   = '#F00';
  }


  pushPiece( pos){
    this.pieces.push( pos);
  }

  drawPixel( context, died, x, y, color){

    context.fillStyle = (died) ? this.colorDied : color;
    context.beginPath();
    context.rect( x - this.offsetPix,  y - this.offsetPix, 2, 2);
    context.fill();
    context.closePath();

  }

  reDrawingBuffer(){
    
    if (this.pieces.length == 0){
      return;
    }

    this.pieces.map( (pos) => {
      let buffer = this._updatePiece(pos);
      this.context.drawImage( buffer, pos.x, pos.y);
    });

    if (!this.debug) {
     this.context.drawImage( this.dataWorld.buffer, 0, 0);
    }

    this.pieces.length = 0;
  }


  drawCrash(){

    let buffer  = document.createElement('canvas'),
        context = buffer.getContext('2d');

    buffer.width  = this.dataWorld.width;
    buffer.height = this.dataWorld.height;
    
    this.pieces.map((pos) => {

      let pixel = this.dataWorld.getCell( pos);

      for (let i = 0; i < pixel.length; i++) {

        let _x = pixel[i].x;
        let _y = pixel[i].y;

        if( pixel[i].died){

          if( this.bufferCrash){
            context.drawImage( this.bufferCrash, _x - 3, _y- 3);
          }
        }

      }

    });

    this.pieces.length = 0;

    return buffer;
  }

  _updatePiece( pos){

    let buffer    = document.createElement('canvas'),
        context   = buffer.getContext('2d'),
        pixel     = this.dataWorld.getCell( pos);
    for (let i = 0; i < pixel.length; i++) {

      let _x = pixel[i].x - pos.x;
      let _y = pixel[i].y - pos.y;

      this.drawPixel( context, pixel[i].died, _x, _y, pixel[i].color);
    }

    return buffer;
  }


  resetBuffer(){

    for (let pixel of this.dataWorld.getCoordonate()) {
      pixel.died = false;
    }

    this.updateBuffer();

  }


  updateBuffer(){
    
    this.buffer.width  = this.dataWorld.width;
    this.buffer.height = this.dataWorld.height;

    this.size.x        = this.dataWorld.width;
    this.size.y        = this.dataWorld.height;
    this.totalPixel    = this.dataWorld.total;

    for (let { x, y, died, color } of this.dataWorld.getCoordonate()) {
      this.drawPixel( this.context, died, x, y, color);
    }

    if (!this.debug) {
      this.context.drawImage( this.dataWorld.buffer, 0, 0);
    }

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