class Keyboard {
  constructor() {
    this.main = null;
    this.keysContainer = null;
    this.screen = null;
    this.keys = [];
    this.value = '';
    this.capsLock = false;
  }

  init() {
    // Create main elements
    this.main = document.createElement('div');
    this.keysContainer = document.createElement('div');
    this.screen = document.createElement('textarea');

    // Setup main elements
    this.main.classList.add('keyboard');
    this.keysContainer.classList.add('keyboard__keys');
    this.keysContainer.append(this.#createKeys());
    this.screen.classList.add('screen');
    this.keys = this.keysContainer.querySelectorAll('.keyboard__key');

    // Add to DOM
    this.main.append(this.keysContainer);
    document.body.append(this.main);
    document.body.prepend(this.screen);
  }

  #createKeys() {
    const fragment = document.createDocumentFragment();
    const keyLayout = [
      '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'backspace',
      'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p',
      'caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'enter',
      'done', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '?',
      'space',
    ];

    // Creates HTML for an icon
    const createInnerHTML = () => document.createElement('div');
    keyLayout.forEach((key) => {
      const keyElement = document.createElement('button');
      const insertLineBreak = ['backspace', 'p', 'enter', '?'].indexOf(key) !== -1;

      // Add attributes/classes
      keyElement.setAttribute('type', 'button');
      keyElement.classList.add('keyboard__key');

      switch (key) {
        case 'backspace':
          keyElement.classList.add('keyboard__key--wide');
          const backspaceContainer = createInnerHTML();
          backspaceContainer.innerHTML = 'backspace';
          keyElement.append(backspaceContainer);

          keyElement.addEventListener('click', () => {
            this.value = this.value.substring(0, this.value.length - 1);
            this.screen.value = this.value;
          });

          break;

        case 'caps':
          keyElement.classList.add('keyboard__key--wide', 'keyboard__key--activatable');
          const capsContainer = createInnerHTML();
          capsContainer.innerHTML = 'caps lock';
          keyElement.append(capsContainer);

          keyElement.addEventListener('click', () => {
            this.#toggleCapsLock();
            keyElement.classList.toggle('keyboard__key--active', this.capsLock);
          });

          break;

        case 'enter':
          keyElement.classList.add('keyboard__key--wide');
          const enterContainer = createInnerHTML();
          enterContainer.innerHTML = 'enter';
          keyElement.append(enterContainer);

          keyElement.addEventListener('click', () => {
            this.value += '\n';
            this.screen.value = this.value;
          });

          break;

        case 'space':
          keyElement.classList.add('keyboard__key--extra-wide');
          const spaceContainer = createInnerHTML();
          spaceContainer.innerHTML = 'space';
          keyElement.append(spaceContainer);

          keyElement.addEventListener('click', () => {
            this.value += ' ';
            this.screen.value = this.value;
          });

          break;

        default:
          const symbolContainer = document.createElement('div');
          keyElement.append(symbolContainer);
          symbolContainer.textContent = key.toLowerCase();
          // keyElement.textContent = key.toLowerCase();

          keyElement.addEventListener('click', () => {
            this.value += this.capsLock ? key.toUpperCase() : key.toLowerCase();
            this.screen.value = this.value;
          });
          break;
      }

      fragment.append(keyElement);

      if (insertLineBreak) {
        fragment.append(document.createElement('br'));
      }
    });

    return fragment;
  }

  #toggleCapsLock() {
    this.capsLock = !this.capsLock;

    for (const key of this.keys) {
      key.innerHTML = this.capsLock
        ? key.innerHTML.toUpperCase()
        : key.innerHTML.toLowerCase();
    }
  }
}

export default Keyboard;
