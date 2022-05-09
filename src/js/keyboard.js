import getCaretPos from './getCaretPos';
import KeyButton from './keyButton';
import setCaretToPos from './setCaretPos';
import toggleCase from './toggleCase';

class Keyboard {
  constructor(keyboardData) {
    this.keyboardData = keyboardData;
    this.main = null;
    this.keysContainer = null;
    this.screen = null;
    this.keys = [];
    this.value = '';
    this.capsLock = false;
    this.shift = false;
    this.language = 'en';
  }

  init() {
    this.main = document.createElement('div');
    this.keysContainer = document.createElement('div');
    this.screen = document.createElement('textarea');

    this.main.classList.add('keyboard');
    this.keysContainer.classList.add('keyboard__keys');
    this.keysContainer.append(this.#createKeys());
    this.screen.classList.add('screen');
    this.keys = this.keysContainer.querySelectorAll('.keyboard__key');

    this.main.append(this.keysContainer);
    this.main.prepend(this.screen);
    document.body.append(this.main);
  }

  #createKeys() {
    const fragment = document.createDocumentFragment();
    const keyLayout = { ...this.keyboardData };

    const mainBlock = document.createElement('div');
    mainBlock.classList.add('mainBlock');
    const numBlock = document.createElement('div');
    numBlock.classList.add('numPad');
    const arrowBlock = document.createElement('div');
    arrowBlock.classList.add('arrowBlock');
    const settingBlock = document.createElement('div');
    settingBlock.classList.add('settingsBlock');

    const allButtons = Object.keys(keyLayout);
    allButtons.forEach((prop) => {
      let parentBlock = null;
      switch (keyLayout[prop].block) {
        case 'numKey':
          parentBlock = numBlock;
          break;
        case 'arrowKey':
          parentBlock = arrowBlock;
          break;
        case 'settingKey':
          parentBlock = settingBlock;
          break;
        default:
          parentBlock = mainBlock;
          break;
      }

      const keyElement = new KeyButton(parentBlock, prop, keyLayout, this.language).create();

      switch (prop) {
        case 'Backspace':
          keyElement.addEventListener('mousedown', () => {
            const position = getCaretPos(this.screen);
            const arr = this.value.split('');
            if (position !== 0) {
              arr.splice(position - 1, 1);
            }
            const newValue = arr.join('');
            this.value = newValue;
            this.screen.value = this.value;
            if (position === 0) {
              setCaretToPos(this.screen, 0);
            } else {
              setCaretToPos(this.screen, position - 1);
            }
          });
          break;

        case 'Escape':
        case 'F1':
        case 'F2':
        case 'F3':
        case 'F4':
        case 'F5':
        case 'F6':
        case 'F7':
        case 'F8':
        case 'F9':

          keyElement.addEventListener('mousedown', () => {
          });
          break;

        case 'CapsLock':

          keyElement.addEventListener('mousedown', () => {
            this.#toggleCapsLock();
          });

          break;

        case 'AltLeft':
        case 'AltRight':
         
          break;

        case 'Enter':
          keyElement.classList.add('keyboard__key--wide');

          keyElement.addEventListener('mousedown', () => {
            this.value += '\n';
            this.screen.value = this.value;
          });

          break;

        case 'Tab':
          keyElement.addEventListener('mousedown', () => {
            this.value += '    ';
            this.screen.value = this.value;
          });

          break;

        case 'ControlLeft':
          break;

        case 'ControlRight':
          break;

        case 'ShiftLeft':
        case 'ShiftRight':
          keyElement.addEventListener('mousedown', () => {
            this.#toggleShift();
          });
          keyElement.addEventListener('mouseup', () => {
            this.#toggleShift();
          });
          break;

        case 'Space':
          keyElement.addEventListener('mousedown', () => {
            this.value += ' ';
            this.screen.value = this.value;
          });

          break;

        default:
          keyElement.addEventListener('mousedown', () => {
            this.value += (this.capsLock && !this.shift) || (!this.capsLock && this.shift)
              ? keyLayout[prop][this.language].toUpperCase()
              : keyLayout[prop][this.language].toLowerCase();

            this.screen.value = this.value;
          });
          break;
      }
    });

    const block = document.createElement('div');
    block.classList.add('mainGroup');
    fragment.append(settingBlock);
    fragment.append(block);
    block.append(mainBlock);
    block.append(arrowBlock);
    block.append(numBlock);
    return fragment;
  }

  #toggleCapsLock() {
    this.capsLock = !this.capsLock;

    this.keys.forEach((key, i) => {
      this.keys[i].innerHTML = this.capsLock
        ? this.keys[i].innerHTML.toUpperCase()
        : this.keys[i].innerHTML.toLowerCase();
    });
  }

  #toggleShift() {
    this.shift = !this.shift;
    this.keys.forEach((keySymbol, i) => {
      this.keys[i].innerHTML = toggleCase(keySymbol.innerHTML);
    });
  }
}

export default Keyboard;
