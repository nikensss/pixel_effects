'use strict';
const draw = (canvasId, action) => {
  const img = new Image();
  const mouse = new Mouse();
  img.src = 'code.svg';

  img.addEventListener('load', () => {
    const canvas = document.getElementById(canvasId);
    const context = canvas.getContext('2d');
    canvas.width = img.width * 4;
    canvas.height = img.height * 4;
    console.log('Image loaded');
    console.log(canvas.offsetHeight);

    context.drawImage(img, 0, 0);
    const pixels = getPixels(canvas, img);
    context.putImageData(pixels.toImage(), 0, 0);
    const particles = pixels.asParticles(167);

    const animate = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update(mouse);
        p.draw();
      });
      console.log('animation frame');
      requestAnimationFrame(animate);
    };

    animate();
  });
};

draw('canvas1');
