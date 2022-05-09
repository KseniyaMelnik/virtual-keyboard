class KeyButton {
  constructor(parentNode, key, keyLayout, language) {
    this.parentNode = parentNode;
    this.key = key;
    this.keyLayout = keyLayout;
    this.language = language;
  }

  #createSymbolIcon(key) {
    const symbolContainer = document.createElement('div');
    symbolContainer.innerHTML = this.keyLayout[key][this.language];
    return symbolContainer;
  }

  addKeyboardListener(keyElement) {
    window.addEventListener('keydown', (event) => {
      event.preventDefault();
      if (event.code === this.key) {
        const fakeMouseDown = new Event('mousedown', { bubbles: true, cancelable: true });
        keyElement.dispatchEvent(fakeMouseDown);
        keyElement.classList.add('keyboard__key_active');
      }
    });
    window.addEventListener('keyup', (event) => {
      if (event.code === this.key) {
        const fakeMouseUp = new Event('mouseup', { bubbles: true, cancelable: true });
        keyElement.dispatchEvent(fakeMouseUp);
        keyElement.classList.remove('keyboard__key_active');
      }
    });
  }

  create() {
    const keyElement = document.createElement('button');
    keyElement.setAttribute('type', 'button');
    keyElement.classList.add('keyboard__key', this.keyLayout[this.key].class, this.keyLayout[this.key].block);
    keyElement.append(this.#createSymbolIcon(this.key));

    this.addKeyboardListener(keyElement);
    this.parentNode.append(keyElement);
    return keyElement;
  }
}

export default KeyButton;
