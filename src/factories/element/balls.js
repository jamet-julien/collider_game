import Trait  from "../../class/trait.js";
import Ball   from "../../class/ball.js";
import Mover  from "../../trait/mover.js";
import Bounce from "../../trait/bounce.js";


class Hit extends Trait{

  constructor(subject) {
    super('hit');
    this.subject = subject;
  }

  trigger( candidate) {

    let position = {
        x : 0,
        y : 0
    };

    if( !candidate.destroy){
      //this.subject.bounce.collide( this.subject, candidate);
    }

    return position;
  }

  update( entity) { }

}



export function createBall(conf, { width, height }) {

  function randomPos() {
    return {
      x: Math.ceil( Math.random() * width),
      y: Math.ceil( Math.random() * height)
    };
  }

  function draw( context, cumulate) {

    context.fillStyle = `#FFF`;
    context.beginPath();

    context.arc(
      this.pos.x,
      this.pos.y,
      this.radius,
      0,
      2 * Math.PI,
      false
    );

    context.fill();
    context.closePath();
  }

  function drawPaint( context, cumulate){

    context.strokeStyle = `#000`;
    context.strokeStyle = `#000`;
   
    context.beginPath();
    context.moveTo(this.lastPos.x, this.lastPos.y);
    context.lineWidth = this.width;
    context.lineCap   = 'round';
    context.lineTo(this.pos.x, this.pos.y);
    context.stroke();

    this.lastPos = this.pos.copy();

  }

  return function ballElement({ size }) {
    let ball = new Ball( Object.assign(randomPos(), { size }));

    let x = ( Math.random() * 600) - 300;
    let y = ( Math.random() * 600) - 300;

    ball.addTrait( new Mover( x, y));
    ball.addTrait( new Bounce( { width, height }));
    ball.addTrait( new Hit( ball));

    ball.grid = conf.resolution;

    ball.draw        = draw.bind(ball);
    ball.drawPaint   = drawPaint.bind( ball);
    
    return ball;

  }

}
