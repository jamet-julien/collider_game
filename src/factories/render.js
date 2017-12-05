

export default function Render({ width = 720, height=480 }) {

  let layers = [],
    _width = width,
    _height = height;

  function push(funcDraw) {
    layers.push( funcDraw);
  }

  function draw(context, deltaTime) {
    context.clearRect(0, 0, _width, _height);
    layers.map(funcDraw => {
      
      funcDraw( context, deltaTime);
    });
  }

  return {
    push,
    draw,
  }

};