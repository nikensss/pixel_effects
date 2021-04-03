const shadesOfBlues = [
  'powderblue',
  'lightblue',
  'lightskyblue',
  'skyblue',
  'deepskyblue',
  'dodgerblue',
  'cornflowerblue',
  'aqua',
  'aquamarine',
  'turquoise'
];
class Particle {
  constructor(canvas, buttons) {
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
    this.x = Math.random() * this.canvas.width;
    this.y = Math.random() * this.canvas.height;
    this.speed = 0;
    this.velocity = Math.random() * 0.5;
    this.size = (Math.random() * 1) / 5 + 1;
    this.buttons = buttons;
    this.seed = 0;
  }

  update(pixels) {
    this.speed =
      (1 - pixels.getPixel(this.x, this.y).getRelativeBrightness()) ** 2;

    const movement = 2.5 * this.speed + this.velocity;
    this.x += Math.random() * 2 - 1;
    if (this.x < 0 || this.x > this.canvas.width) {
      this.x = Math.random() * this.canvas.width;
    }
    this.y += movement;
    if (this.y < 0) this.y = 0;
    if (this.y >= this.canvas.height) this.y = 0;
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
      case 'shadesOfBlue':
        const colors = shadesOfBlues;
        this.context.fillStyle =
          colors[Math.floor(Math.random() * colors.length)];
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
}

function randomRGB(seed) {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  return `rgb(${r},${g},${b})`;
}
