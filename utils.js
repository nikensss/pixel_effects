const inArraysOf = (length) => (t, c) => {
  const pixel = t.pop() || [];
  if (pixel.length === length) {
    t.push(pixel);
    t.push([c]);
    return t;
  }
  pixel.push(c);
  t.push(pixel);
  return t;
};

const createImageFromPixels = (pixels, width, height) => {
  return new ImageData(
    Uint8ClampedArray.from(pixels.map((p) => p.data).flat()),
    width,
    height
  );
};

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
