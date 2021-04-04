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

const getPixels = (canvas, img) => {
  const context = canvas.getContext('2d');
  const scannedImage = context.getImageData(0, 0, canvas.width, canvas.height);
  return new Pixels(
    canvas,
    scannedImage.data.reduce(inArraysOf(4), []).map((e) => new Pixel(...e))
  );
};

const createImageFromPixels = (pixels, width, height) => {
  return new ImageData(
    Uint8ClampedArray.from(pixels.map((p) => p.data).flat()),
    width,
    height
  );
};
