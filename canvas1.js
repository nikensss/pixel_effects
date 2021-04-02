'use strict';
draw('canvas1', (canvas, context) => {
  const scannedImage = context.getImageData(0, 0, canvas.width, canvas.height);

  const pixels = scannedImage.data
    .reduce(inArraysOf(4), [])
    .map((e) => new Pixel(...e));

  const greyScale = createImageFromPixels(
    pixels.map((p) => p.toGreyScale()),
    scannedImage.width,
    scannedImage.height
  );

  context.putImageData(greyScale, 0, 0);
});
