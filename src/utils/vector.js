
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

  limit(iMag) {
    var iMagCurrent = this.magnetude;

    if (iMagCurrent > iMag) {
      this.magnetude = iMag;
    }
    return this
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