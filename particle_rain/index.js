const img = new Image();
img.src = 'Cyberpunk2077.jpeg';

function setup() {
  window.map = map.bind(this);
  window.noise = noise.bind(this);
}

img.addEventListener('load', () => {
  const canvas = document.getElementById('canvas1');
  const buttons = new Buttons();
  const context = canvas.getContext('2d');
  canvas.width = img.width;
  canvas.height = img.height;

  context.drawImage(img, 0, 0, canvas.width, canvas.height);
  const pixels = getPixels(canvas);
  context.clearRect(0, 0, canvas.width, canvas.height);
  const particles = [];
  for (
    let i = 0;
    i < 15000;
    i = particles.push(new Particle(canvas, buttons))
  ) {}

  const animate = () => {
    // context.drawImage(img, 0, 0, canvas.width, canvas.height);
    context.globalAlpha = 0.05;
    context.fillStyle = 'rgb(0,0,0)';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.globalAlpha = 0.4;
    particles.forEach((p) => {
      p.update(pixels);
      context.globalAlpha = 1 - p.speed;
      p.draw(pixels);
    });

    requestAnimationFrame(animate);
  };

  animate();
});
