'use strict';
const draw = (canvasId, action) => {
  const canvas = document.getElementById(canvasId);
  const context = canvas.getContext('2d');
  canvas.width = canvas.parentElement.clientWidth * 0.95;
  canvas.height = canvas.parentElement.clientHeight * 0.95;

  const image1 = new Image();
  image1.src = 'code.png';
  console.log({ img: image1 });
  image1.addEventListener('load', () => {
    context.drawImage(
      image1,
      canvas.width / 2 - image1.width / 2,
      canvas.height / 2 - image1.height / 2
    );
    if (action) action(canvas, context);
  });
};
