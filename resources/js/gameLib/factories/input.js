import KeyboardState from "../class/keyboardstate.js";


export function setupKeyboard( entities) {

  const input = new KeyboardState();
 
  let barLeft  = [],
      barRight = [];

  entities.map( entity => {

    if ( entity.side == 'left'){
      barLeft.push( entity);
    } else if (entity.side == 'right'){
      barRight.push( entity);
    }

  });

  input.addMapping('ArrowLeft', keyState => {

    barRight.map( (barre) =>{
      if (keyState) {
        barre.rotate.disable = true;
      }else{
        barre.rotate.disable = false;
      }
    });


  });

  input.addMapping('ArrowRight', keyState => {

    barLeft.map( (barre) =>{

      if(keyState){
        barre.rotate.disable = true;
      }else{
        barre.rotate.disable = false;
      }

    });

  });

  return input;
}