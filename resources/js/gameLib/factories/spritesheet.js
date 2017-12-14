

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

      bufferTmp.width  = width;
      bufferTmp.height = height;

      contextTmp.drawImage(
              buffer,
              0, 0,
              buffer.width, buffer.height,
              0, 0,
              width, height);

      return bufferTmp;
    }

  init();

  return function getCrash( { width, height} ){
    return resize( 6, 6);
  }

}