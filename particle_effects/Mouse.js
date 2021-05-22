class Mouse {
  #x;
  #y;

  constructor() {
    this.#x = 0;
    this.#y = 0;

    const mouse = document.getElementById('mouse');

    window.addEventListener('mousemove', (event) => {
      this.#x = event.x;
      this.#y = event.y;

      mouse.style.transform = `translate(${
        this.#x - mouse.offsetWidth / 2
      }px, ${this.#y - mouse.offsetHeight / 2}px)`;

      mouse.style.visibility = 'visible';
      mouse.style.backgroundColor = 'rgba(89,172,45,0.3)';
    });
  }

  get x() {
    return this.#x;
  }

  get y() {
    return this.#y;
  }
}
