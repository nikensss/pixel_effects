class Pixels {
  constructor(canvas, pixels) {
    this.c = canvas;
    this.w = canvas.width;
    this.h = canvas.height;
    this.pixels = pixels;
    this.pixels.forEach((p, i) => {
      p.x = i % this.w;
      p.y = parseInt(i / this.w);
    });
  }

  getPixel(x, y) {
    [x, y] = [Math.floor(x), Math.floor(y)];
    return this.pixels[y * this.w + x];
  }

  asParticles(offset) {
    if (offset <= 0) offset = 1;
    const particles = this.pixels
      .map((p) => new Particle(this.c, p))
      .filter((p, i) => i % offset === 0);
    particles.forEach((p, i, a) => {
      const closest = a
        .slice()
        .sort((x, y) => p.distanceTo(x) - p.distanceTo(y));
      p.addNeighbor(closest.shift())
        .addNeighbor(closest.shift())
        .addNeighbor(closest.shift())
        .addNeighbor(closest.shift());
    });

    return particles;
  }

  toGreyScale() {
    return new Pixels(
      this.c,
      this.pixels.map((p) => p.toGreyScale())
    );
  }

  tintRed(red) {
    return new Pixels(
      this.c,
      this.pixels.map((p) => p.toGreyScale())
    );
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
    return new Pixels(
      this.c,
      this.pixels.map((p) => p.tint(color, value))
    );
  }

  update(mouse) {
    this.pixels.forEach((p) => p.update(mouse));
  }

  draw() {
    this.pixels.forEach((p) => p.draw());
  }

  toImage() {
    return new ImageData(
      Uint8ClampedArray.from(this.pixels.map((p) => p.data).flat()),
      this.w,
      this.h
    );
  }
}
