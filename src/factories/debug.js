

export function drawGrid(conf, { width, height }) {
  let self = {
    buffer: null
  }, _conf, _ctx, _width = width, _height = height;

  function init(self) {

    self.buffer = document.createElement('canvas');
    _ctx = self.buffer.getContext('2d');

    self.buffer.width = _width;
    self.buffer.height = _height;

    _ctx.strokeStyle = "green";

    for (let i = 0; i < _width; i += conf.resolution) {
      _ctx.beginPath();
      _ctx.moveTo(i, 0);
      _ctx.lineTo(i, _height);
      _ctx.stroke();
    }

    for (let j = 0; j < _height; j += conf.resolution) {
      _ctx.beginPath();
      _ctx.moveTo(0, j);
      _ctx.lineTo(_width, j);
      _ctx.stroke();
    }

  }

  function createDraw(buffer) {
    return function draw(context, cumulateTime) {
      context.drawImage(buffer, 0, 0);
    }
  }

  init(self);
  return createDraw( self.buffer);
};


export function snapCollider( entities){

  return function (context, cumulate) {
    context.fillStyle = "rgba(255, 255, 255, 0.3)";

    entities.map(( entity) => {
      if(entity.mover){
        let snapPos = entity.mover.snapPos( entity);
  
        context.beginPath();
        context.rect(
          snapPos.x,
          snapPos.y,
          entity.grid,
          entity.grid
        );
  
        context.fill();
      }

    })
  }
}


export function colliderView( entities){


  return function( context, cumulate){
    context.strokeStyle = "red";

    entities.map( (entity) =>{

      context.beginPath();
      context.rect( 
        entity.bound.left,
        entity.bound.top,
        entity.bound.width,
        entity.bound.height
      );

      context.stroke();

    })
  }

}