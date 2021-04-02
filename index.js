'use strict';
const canvas = document.getElementById('canvas1');
const context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

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
const image1 = new Image();
image1.src = 'code.svg';
image1.addEventListener('load', () => {
  context.drawImage(image1, 0, 0);
  context.drawImage(image1, 0, canvas.height / 2);
  const scannedImage = context.getImageData(0, 0, canvas.width, canvas.height);
  console.log(scannedImage);
  const pixels = scannedImage.data.reduce(inArraysOf(4), []).map((e) => new Pixel(...e));
  const greyScale = context.createImageData(
    new ImageData(
      Uint8ClampedArray.from(pixels.map((p) => p.inGreyScale().data).flat()),
      scannedImage.width,
      scannedImage.height
    )
  );
  console.log(greyScale);
  // context.putImageData(greyScale, 0, 0);
  console.log('done');
});

class Pixel {
  constructor(r, g, b, a) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }

  inGreyScale() {
    const avg = Math.ceil((this.r + this.g + this.b) / 3);
    // const avg = Math.ceil(Math.random() * 255);
    return new Pixel(92, 23, 235, this.a);
  }

  get data() {
    return [this.r, this.g, this.b, this.a];
  }
}
