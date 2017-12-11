function radToDeg(iAngle) {
  return (iAngle * 180) / Math.PI;
}

export default class Vector {

  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  copy() {
    return new Vector(this.x, this.y);
  }

  mult(iMult) {
    this.x *= iMult;
    this.y *= iMult;
    return this;
  }

  div(iDiv) {
    this.x /= iDiv;
    this.y /= iDiv;
    return this;
  }

  add(oVector) {
    this.x += oVector.x;
    this.y += oVector.y;
    return this;
  }

  sub(oVector) {
    this.x -= oVector.x;
    this.y -= oVector.y;
    return this;
  }

  limitMax( iMag) {
    var iMagCurrent = this.magnetude;

    if (iMagCurrent > iMag) {
      this.magnetude = iMag;
    }
    return this
  }

  limitMin( iMag) {
    var iMagCurrent = this.magnetude;

    if (iMagCurrent < iMag) {
      this.magnetude = iMag;
    }
    return this
  }

  /**
  * [angle description]
  * @return {[type]} [description]
  */
  get angle() {
    var iAngleR = Math.atan2(this.y, this.x);
    return radToDeg(iAngleR);
  }

  /**
   * [setAngle description]
   * @param {[type]} iAngle [description]
   */
  set angle(iAngle) {

    var iHeading = this.angle + iAngle,
      iMag = this.magnetude;

    this.x = Math.cos( iHeading) * iMag;
    this.y = Math.sin( iHeading) * iMag;

    return this;

  }

  get unit() {
    var iMag = this.magnetude;
    return (iMag === 0) ? this : this.div(iMag);
  }

  get magnetude() {
    return Math.sqrt((this.x * this.x) + (this.y * this.y));
  }

  set magnetude(mag) {
    return this.unit.mult(mag);
  }

}