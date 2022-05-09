import './style/style.css';
import Keyboard from './js/keyboard';
import keyboardData from './js/keyboardData';

const keyboard = new Keyboard(keyboardData);

window.addEventListener('DOMContentLoaded', () => {
  keyboard.init();
});
