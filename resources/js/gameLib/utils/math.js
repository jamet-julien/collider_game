

export function indexToXY( index, mapWidth){

  var x = index % mapWidth;
  var y = Math.floor( index / mapWidth);

  return [x, y];
}

export function intersectSegment( oSeg1, oSeg2) {

  let Ax = oSeg1.point1.x,
      Ay = oSeg1.point1.y,
      Bx = oSeg1.point2.x,
      By = oSeg1.point2.y;

  let Cx = oSeg2.point1.x,
      Cy = oSeg2.point1.y,
      Dx = oSeg2.point2.x,
      Dy = oSeg2.point2.y;

  let Sx, Sy;

  let pCD, pAB, oCD, oAB;

  if (Ax == Bx) {

    if (Cx == Dx) {
      return false;
    } else {
      pCD = (Cy - Dy) / (Cx - Dx);
      Sx = Ax;
      Sy = pCD * (Ax - Cx) + Cy;
    }

  } else {
    if (Cx == Dx) {
      pAB = (Ay - By) / (Ax - Bx);
      Sx  = Cx;
      Sy  = pAB * (Cx - Ax) + Ay;
    } else {
      pCD = (Cy - Dy) / (Cx - Dx);
      pAB = (Ay - By) / (Ax - Bx);
      oCD = Cy - pCD * Cx;
      oAB = Ay - pAB * Ax;
      Sx  = (oAB - oCD) / (pCD - pAB);
      Sy  = pCD * Sx + oCD;
    }
  }

  //last verification
  if ((Sx < Ax && Sx < Bx) ||
    (Sx > Ax && Sx > Bx) ||

    (Sx < Cx && Sx < Dx) ||
    (Sx > Cx && Sx > Dx) ||

    (Sy < Ay && Sy < By) ||
    (Sy > Ay && Sy > By) ||

    (Sy < Cy && Sy < Dy) ||
    (Sy > Cy && Sy > Dy)) {
    return false;
  }

  return { x: Sx, y: Sy };
}
