class Pixel {
  constructor(r, g, b, a) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }

  toGreyScale() {
    const avg = Math.ceil((this.r + this.g + this.b) / 3);
    return new Pixel(avg, avg, avg, this.a);
  }

  tintRed(red) {
    return this.tint('r', red);
  }

  tintGreen(green) {
    return this.tint('g', green);
  }

  tintBlue(blue) {
    return this.tint('b', blue);
  }

  tint(color, value) {
    const p = this.toGreyScale();
    p[color] = Math.min(p[color] + value, 255);
    return p;
  }

  get data() {
    return [this.r, this.g, this.b, this.a];
  }
}
