class Buttons {
  constructor() {
    this.buttons = document.querySelectorAll('.btn.btn-style');
    this.style = 'transparent';

    this.buttons.forEach((b) => {
      b.onclick = () => (this.style = b.getAttribute('data-state'));
    });
  }
}
