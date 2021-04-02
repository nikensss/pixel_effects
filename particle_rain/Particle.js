class Particle {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
    this.x = Math.random() * this.canvas.width;
    this.y = Math.random() * this.canvas.height;
    this.speed = 0;
    this.velocity = Math.random() * 0.5;
    this.size = Math.random() * 1.5 + 1;
  }

  update(pixels) {
    this.speed =
      (1 - pixels.getPixel(this.x, this.y).getRelativeBrightness()) ** 2;

    const movement = 1.867 * this.speed + this.velocity;
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
    const colors = ['cadetblue', 'darkorchid', 'dodgerblue'];
    this.context.fillStyle = colors[Math.floor(Math.random() * 4)];
    // this.context.fillStyle = pixels.getPixel(this.x, this.y).getComplementary();
    this.context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    this.context.fill();
  }
}
