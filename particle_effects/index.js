'use strict';
const mouse = new Mouse();
const sampler = document.getElementById('sampler');
const img = new Image();
img.src = 'code.svg';

img.addEventListener('load', () => {
  const canvas = document.getElementById('canvas1');
  const context = canvas.getContext('2d');
  canvas.width = img.width * 4;
  canvas.height = img.height * 4;
  console.log('Image loaded');

  context.drawImage(img, 0, 0);
  const pixels = getPixels(canvas, img);
  context.putImageData(pixels.toImage(), 0, 0);

  let particles = pixels.asParticles(sampler.value);
  sampler.onchange = () => {
    particles = pixels.asParticles(
      Math.min(Math.max(sampler.value, sampler.getAttribute('min')), sampler.getAttribute('max'))
    );
  };

  const animate = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      p.update(mouse);
      p.draw();
    });
    requestAnimationFrame(animate);
  };

  animate();
});
