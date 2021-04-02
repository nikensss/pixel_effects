class Pixels {
  constructor(width, height, pixels) {
    this.w = width;
    this.h = height;
    this.pixels = pixels;
  }

  getPixel(x, y) {
    [x, y] = [Math.floor(x), Math.floor(y)];
    return this.pixels[y * this.w + x];
  }
}
