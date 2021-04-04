class Mouse {
  #x;
  #y;

  constructor() {
    this.#x = 0;
    this.#y = 0;

    window.addEventListener('mousemove', (event) => {
      this.#x = event.x;
      this.#y = event.y;
    });
  }

  get x() {
    return this.#x;
  }

  get y() {
    return this.#y;
  }
}
