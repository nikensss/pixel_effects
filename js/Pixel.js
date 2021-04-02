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

  getRelativeBrightness() {
    return (
      Math.sqrt(
        this.r ** 2 * 0.299 + this.g ** 2 * 0.587 + this.b ** 2 * 0.114
      ) / 255
    );
  }

  getComplementary() {
    const r = 255 - this.r;
    const g = 255 - this.g;
    const b = 255 - this.b;

    return `rgb(${r},${g},${b})`;
  }

  get data() {
    return [this.r, this.g, this.b, this.a];
  }
}
