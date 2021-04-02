'use strict';
const draw = (canvasId, action) => {
  const image1 = new Image();
  image1.src = 'code.png';

  image1.addEventListener('load', () => {
    const canvas = document.getElementById(canvasId);
    const context = canvas.getContext('2d');
    canvas.width = canvas.parentElement.clientWidth * 0.95;
    canvas.height = canvas.parentElement.clientHeight * 0.95;
    context.drawImage(
      image1,
      canvas.width / 2 - image1.width / 2,
      canvas.height / 2 - image1.height / 2
    );

    const scannedImage = context.getImageData(
      0,
      0,
      canvas.width,
      canvas.height
    );

    const pixels = scannedImage.data
      .reduce(inArraysOf(4), [])
      .map((e) => new Pixel(...e));

    if (!action) action = (pixels) => pixels.map((p) => p.toGreyScale());

    const data = createImageFromPixels(
      action(pixels),
      scannedImage.width,
      scannedImage.height
    );

    context.putImageData(data, 0, 0);
  });
};

draw('canvas1');
draw('canvas2', (pixels) => pixels.map((p) => p.tintRed(100)));
draw('canvas3', (pixels) => pixels.map((p) => p.tintGreen(100)));
draw('canvas4', (pixels) => pixels.map((p) => p.tintBlue(100)));
