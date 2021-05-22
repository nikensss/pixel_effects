function lensing(mouse) {
  const d = this.distanceTo.call(this.pos, mouse);
  if (d >= MAX_DISTANCE) {
    this.x = this.pixel.x + this.offset;
    this.y = this.pixel.y + this.offset;
    return;
  }

  const direction = {
    x: (this.pos.x - mouse.x) / MAX_DISTANCE,
    y: (this.pos.y - mouse.y) / MAX_DISTANCE
  };

  const relativeDistance = d / MAX_DISTANCE;
  const forceModulationFactor = 1 - relativeDistance ** 2;
  const movement = MAX_DISTANCE * forceModulationFactor;

  this.x = this.pixel.x + this.offset + direction.x * movement;
  this.y = this.pixel.y + this.offset + direction.y * movement;
}
