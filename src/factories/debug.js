

export function drawGrid(conf, { width, height }) {
  let self = {
    buffer: null
  }, _conf, _ctx, _width = width, _height = height;

  function init(self) {

    let middle  = Math.round(conf.resolution / 2);

    self.buffer = document.createElement('canvas');

    _ctx = self.buffer.getContext('2d');
    self.buffer.width  = _width;
    self.buffer.height = _height;

    _ctx.strokeStyle = "green";
    _ctx.fillStyle   = "green";
    _ctx.font        = "bold 12px Arial";
    _ctx.textAlign   = 'center';


    for (let i = 0; i < _width; i += conf.resolution) {

      _ctx.fillText( i, i + middle , middle);

      _ctx.beginPath();
      _ctx.moveTo(i, 0);
      _ctx.lineTo(i, _height);
      _ctx.stroke();
      _ctx.closePath();
    }

    for (let j = 0; j < _height; j += conf.resolution) {

      _ctx.fillText( j, middle, j + middle);

      _ctx.beginPath();
      _ctx.moveTo(0, j);
      _ctx.lineTo(_width, j);
      _ctx.stroke();
      _ctx.closePath();
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
        let snapPosList = entity.mover.snapPos( entity);
        
        snapPosList.map((snapPos)=>{

          context.beginPath();
          context.rect(
            snapPos.x,
            snapPos.y,
            entity.grid,
            entity.grid
          );

          context.fill();
          context.closePath();

        })
      }

    })
  }
}

export function colliderBarre( entities){

  let barres = entities.filter(entity => entity.point2);

    return function( context, cumulate){
      context.strokeStyle = "blue";
      context.lineCap   = 'round';
      
      barres.map((entity) => {
        
        context.beginPath();
        context.lineWidth = 5;
        context.moveTo( entity.point1.x, entity.point1.y);
        context.lineTo( entity.point2.x, entity.point2.y );
        context.stroke();
        context.closePath();

      });
    }

}


export function colliderView( entities){


  return function( context, cumulate){
    context.strokeStyle = "red";
    
    entities.map( (entity) =>{
      
      context.beginPath();
      context.lineWidth = 1;
      context.rect( 
        entity.bound.left,
        entity.bound.top,
        entity.bound.width,
        entity.bound.height
      );

      context.stroke();
      context.closePath();

      context.fillStyle = `green`;
      context.beginPath();

      context.arc(
        entity.pos.x,
        entity.pos.y,
        2,
        0,
        2 * Math.PI,
        false
      );

      context.fill();
      context.closePath();

      context.fillStyle = `blue`;
      context.beginPath();

      context.arc(
        entity.pos.x + entity.offset.x,
        entity.pos.y + entity.offset.y,
        2,
        0,
        2 * Math.PI,
        false
      );

      context.closePath();
      context.fill();

    })
  }

}