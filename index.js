'use strict';
const draw = (canvasId, action) => {
  const canvas = document.getElementById(canvasId);
  const context = canvas.getContext('2d');
  canvas.width = canvas.parentElement.clientWidth * 0.95;
  canvas.height = canvas.parentElement.clientHeight * 0.95;
  console.log({ w: canvas.width, h: canvas.height });

  const image1 = new Image();
  image1.src = 'code.svg';
  image1.addEventListener('load', () => {
    context.drawImage(image1, 0, 0);
    context.drawImage(image1, 0, canvas.height / 2);
    if (action) action(canvas, context);
  });
};
