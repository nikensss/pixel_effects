const MAX_DISTANCE = document.getElementById('mouse').offsetWidth / 2;

const showConnectionsCheckbox = document.getElementById('show-connections');
function showConnections() {
  return showConnectionsCheckbox.checked;
}

const connectionColorPicker = document.getElementById('color-picker');
function selectedColor() {
  return connectionColorPicker.value;
}
class Particle {
  constructor(canvas, pixel) {
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
    this.baseSize = 2.5;
    this.size = this.baseSize;
    this.pixel = pixel;
    this.x = pixel.x;
    this.y = pixel.y;
    this.neighbors = [];
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

  get offset() {
    return (Math.random() - 0.5) * 2;
  }

  update(mouse) {
    const d = this.distanceTo.call(this.pos, mouse);
    if (d >= MAX_DISTANCE) {
      this.x = this.pixel.x + this.offset;
      this.y = this.pixel.y + this.offset;
      this.size = this.baseSize;
      return;
    }

    const s = d === 0 ? 1 : MAX_DISTANCE / d;

    this.x = s * (this.pos.x - mouse.x) + (mouse.x - this.canvas.offsetLeft);
    this.y = s * (this.pos.y - mouse.y) + (mouse.y - this.canvas.offsetTop);
  }

  draw() {
    if (showConnections()) {
      this.neighbors
        .filter((p) => this.distanceTo(p) < MAX_DISTANCE)
        .forEach((n) => {
          this.context.beginPath();
          this.context.strokeStyle = selectedColor();
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
