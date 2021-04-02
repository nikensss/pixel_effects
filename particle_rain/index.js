const img = new Image();
img.src = 'code.svg';

img.addEventListener('load', () => {
  const canvas = document.getElementById('canvas1');
  const context = canvas.getContext('2d');
  canvas.width = img.width * 4;
  canvas.height = img.height * 4;

  context.drawImage(img, 0, 0, canvas.width, canvas.height);
  const pixels = getPixels(canvas);
  context.clearRect(0, 0, canvas.width, canvas.height);
  const particles = [];
  for (let i = 0; i < 3220; i = particles.push(new Particle(canvas))) {}

  const animate = () => {
    context.globalAlpha = 0.05;
    context.fillStyle = 'rgb(0,0,0)';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.globalAlpha = 0.2;
    particles.forEach((p) => {
      p.update(pixels);
      // context.globalAlpha = 1 - p.speed / 8;
      p.draw(pixels);
    });

    requestAnimationFrame(animate);
  };

  animate();
});
