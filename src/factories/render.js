

export default function Render({ width = 720, height=480 }) {

  let board  = new Map(),
    _width   = width,
    _height  = height;


  function addLayer( name, context, initCall = ()=>{}){
    board.set( name ,{
      layers : [],
      context ,
      initCall
    });
  }

  function pushOnLayer( name, funcDraw){
    if (board.has(name)){

      if(funcDraw){
        board.get( name).layers.push( funcDraw);
      }else{
        console.log( funcDraw + ' - ' + name);
      }
    }
  }

  function draw( deltaTime){
    for (let [key, obj] of board) {
      _drawLayer( obj.layers, obj.context, obj.initCall, deltaTime)
    }
  }

  function drawOnce( name, funcDraw){
    if (board.has(name)) {
      let { context} = board.get(name);
      funcDraw( context);
    }
  }

  function _drawLayer( layers, context, initCall, deltaTime) {
   
    initCall( context, deltaTime); 
    
    layers.map(funcDraw => {
      funcDraw( context, deltaTime);
    });
    

  }

  return {
    addLayer,
    drawOnce,
    pushOnLayer,
    draw
  }

};