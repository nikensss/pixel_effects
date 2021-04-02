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

const getPixels = (scannedImage) => {
  return scannedImage.data
    .reduce(inArraysOf(4), [])
    .map((e) => new Pixel(...e));
};

const createImageFromPixels = (pixels, width, height) => {
  return new ImageData(
    Uint8ClampedArray.from(pixels.map((p) => p.data).flat()),
    width,
    height
  );
};
