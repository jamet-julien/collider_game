

export function createSprite( image){
    
    const buffer  = document.createElement('canvas'),
          context = buffer.getContext('2d');


    function init(){
      buffer.width  = image.width;
      buffer.height = image.height;
      context.drawImage( image, 0, 0);
    }

    function resize( width, height){

      const bufferTmp  = document.createElement('canvas'),
            contextTmp = bufferTmp.getContext('2d');

      bufferTmp.width  = 15;
      bufferTmp.height = 15;

      contextTmp.drawImage(
              buffer,
              0, 0,
              100, 100,
              0, 0,
              15, 15);

      return bufferTmp;
    }

  init();

  return function getCrash( { width, height} ){
    return resize( width, height);
  }

}