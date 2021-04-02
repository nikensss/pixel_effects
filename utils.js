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
    return new Pixel(Math.min(this.r + red, 255), this.g, this.b, this.a);
  }

  tintGreen(green) {
    return new Pixel(this.r, Math.min(this.g + green, 255), this.b, this.a);
  }

  tintBlue(blue) {
    return new Pixel(this.r, this.g, Math.min(this.b + blue, 255), this.a);
  }

  get data() {
    return [this.r, this.g, this.b, this.a];
  }
}
