const img = new Image();
img.src = 'Cyberpunk2077-2.jpeg';

img.addEventListener('load', () => {
  const canvas = document.getElementById('canvas1');
  const buttons = new Buttons();
  const context = canvas.getContext('2d');
  const ratio = img.width / img.height;
  canvas.width = 1200;
  canvas.height = 1200 / ratio;

  context.drawImage(img, 0, 0, canvas.width, canvas.height);
  const pixels = getPixels(canvas);
  context.clearRect(0, 0, canvas.width, canvas.height);
  const particles = [];
  for (
    let i = 0;
    i < 8000;
    i = particles.push(new Particle(canvas, buttons))
  ) {}

  const animate = () => {
    // context.drawImage(img, 0, 0, canvas.width, canvas.height);
    context.globalAlpha = 0.05;
    context.fillStyle = 'rgb(0,0,0)';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.globalAlpha = 0.8;
    particles.forEach((p) => {
      p.update(pixels);
      // context.globalAlpha = 1 - p.speed;
      p.draw(pixels);
    });

    requestAnimationFrame(animate);
  };

  animate();
});
