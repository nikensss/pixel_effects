'use strict';
draw('canvas2', (canvas, context) => {
  const scannedImage = context.getImageData(0, 0, canvas.width, canvas.height);

  const pixels = scannedImage.data
    .reduce(inArraysOf(4), [])
    .map((e) => new Pixel(...e));

  const greyScale = createImageFromPixels(
    pixels.map((p) => p.tintRed(130)),
    scannedImage.width,
    scannedImage.height
  );

  context.putImageData(greyScale, 0, 0);
});
