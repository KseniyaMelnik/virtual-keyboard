import './style/style.css';
import Keyboard from './js/keyboard';

const keyboard = new Keyboard();

window.addEventListener('DOMContentLoaded', () => {
  keyboard.init();
});
