class Particle {
  constructor(canvas, buttons) {
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
    this.x = 0;
    this.y = Math.random() * this.canvas.height;
    this.baseSpeed = Math.random() * 5;
    this.size = Math.random() * 1.5;
    this.buttons = buttons;
    this.angle = 0;
  }

  update(pixels) {
    const speed = pixels.getPixel(this.x, this.y).getRelativeBrightness();
    this.size = speed;
    const movement = speed + this.baseSpeed;

    this.angle += speed / 15;
    this.x += movement + Math.cos(this.angle) * 2;
    if (this.x < 0 || this.x >= this.canvas.width) this.x = 0;

    this.y += movement + Math.sin(this.angle) * 2;
    if (this.y < 0 || this.y >= this.canvas.height) this.y = 0;

    // this.context.globalCompositeOperation = 'luminosity';
  }

  draw(pixels) {
    this.context.beginPath();
    switch (this.buttons.style) {
      case 'white':
        this.context.fillStyle = 'white';
        break;
      case 'transparent':
        this.context.fillStyle = pixels.getPixel(this.x, this.y).getColor();
        break;
      case 'complementary':
        this.context.fillStyle = pixels
          .getPixel(this.x, this.y)
          .getComplementary();
        break;

      case 'random':
        this.context.fillStyle = randomRGB(this.seed++);
        break;
      default:
        this.context.fillStyle = 'white';
    }
    this.context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    this.context.fill();
  }

  random() {
    this.x = 0;
    this.y = Math.random() * this.canvas.height;
  }
}

function randomRGB() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  return `rgb(${r},${g},${b})`;
}
