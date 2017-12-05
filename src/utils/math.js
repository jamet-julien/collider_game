

export function indexToXY( index, mapWidth){

  var x = index % mapWidth;
  var y = Math.floor( index / mapWidth);

  return [x, y];
}