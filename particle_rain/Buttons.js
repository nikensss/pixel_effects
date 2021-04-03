class Buttons {
  constructor() {
    this.buttons = document.querySelectorAll('.btn');
    this.style = 'white';

    this.buttons.forEach((b) => {
      b.onclick = () => (this.style = b.getAttribute('data-state'));
    });
  }
}
