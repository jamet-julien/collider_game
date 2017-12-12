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
    let partHeight = height / 3;
    return {
      x: Math.ceil( Math.random() * width),
      y: Math.ceil((Math.random() * partHeight) + partHeight*2)
    };
  }

  function draw( context, cumulate) {


    if( this.died){
      return false;
    }

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


    if( this.died){
      return false;
    }

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

  function reset(){
    let { x, y } = randomPos();
    this.died    = false;
    this.pos.x   = x;
    this.pos.y   = y;
  }

  return function ballElement({ size }, event) {

    let ball = new Ball( Object.assign(randomPos(), { size }));

    let x = ( Math.random() * 600) - 300;
    let y = ( Math.random() * 600) - 300;

    ball.addTrait( new Mover( x, y));
    ball.addTrait( new Bounce( { width, height }));
    ball.addTrait( new Hit( ball));

    ball.grid  = conf.resolution;
    ball.event = event;


    ball.reste = reset.bind( ball);

    ball.draw        = draw.bind(ball);
    ball.drawPaint   = drawPaint.bind( ball);
    
    return ball;

  }

}
