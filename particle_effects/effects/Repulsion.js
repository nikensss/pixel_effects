function repulsion(mouse) {
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
