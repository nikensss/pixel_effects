'use strict';
const mouse = new Mouse();
const sampler = document.getElementById('sampler');
sampler.clampedValue = function () {
  const [max, min] = [this.getAttribute('max'), this.getAttribute('min')];
  if (this.value < min) return min;
  if (this.value > max) return max;
  return this.value;
};
const particleBehavior = document.getElementById('particle-behavior');

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
  particles.forEach((p) => p.setBehavior(particleBehavior.value));
  sampler.onchange = () => {
    particles = pixels.asParticles(sampler.clampedValue());
  };
  particleBehavior.onchange = () => {
    particles.forEach((p) => p.setBehavior(particleBehavior.value));
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
