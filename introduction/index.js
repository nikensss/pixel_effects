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

    const pixels = getPixels(canvas);
    if (!action) action = (pixels) => pixels.toGreyScale();
    const data = action(pixels).toImage();
    context.putImageData(data, 0, 0);
  });
};

draw('canvas1');
draw('canvas2', (pixels) => pixels.tintRed(100));
draw('canvas3', (pixels) => pixels.tintGreen(100));
draw('canvas4', (pixels) => pixels.tintBlue(100));
