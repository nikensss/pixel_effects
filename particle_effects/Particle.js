class Particle {
  constructor(canvas, pixel) {
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
    this.size = 2.5;
    this.pixel = pixel;
    this.x = pixel.x;
    this.y = pixel.y;
    this.neighbors = [];
    this.showConnections = true;
  }

  addNeighbor(n) {
    this.neighbors.push(n);
    return this;
  }

  distanceTo(p) {
    const dx = Math.abs(this.x - p.x);
    const dy = Math.abs(this.y - p.y);
    return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
  }

  get pos() {
    return {
      x: this.pixel.x + this.canvas.offsetLeft,
      y: this.pixel.y + this.canvas.offsetTop
    };
  }

  update(mouse) {
    const d = this.distanceTo.call(this.pos, mouse);
    const maxDistance = 20;
    if (d >= maxDistance) {
      this.x = this.pixel.x + (Math.random() - 0.5) * 2;
      this.y = this.pixel.y + (Math.random() - 0.5) * 2;
      this.showConnections = true;
      return;
    }

    this.showConnections = false;
    const direction = {
      x: this.pos.x > mouse.x ? 1 : -1,
      y: this.pos.y > mouse.y ? 1 : -1
    };

    const movement = ((maxDistance - d) / maxDistance ** 2) * maxDistance;

    this.x = this.pixel.x + Math.random() * 2 + direction.x * (maxDistance - d); //movement;
    this.y = this.pixel.y + Math.random() * 2 + direction.y * (maxDistance - d); //movement;
  }

  draw(pixels) {
    if (this.showConnections) {
      this.neighbors.forEach((n) => {
        this.context.beginPath();
        this.context.strokeStyle = 'cornflowerblue';
        this.context.moveTo(this.x, this.y);
        this.context.lineTo(n.x, n.y);
        this.context.lineWidth = 1;
        this.context.stroke();
        this.context.closePath();
      });
    }
    this.context.beginPath();
    this.context.fillStyle = this.pixel.getColor();
    this.context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    this.context.fill();
    this.context.closePath();
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
