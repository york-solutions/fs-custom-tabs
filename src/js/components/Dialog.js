import Base from './Base.js';

/**
 * Modal dialog. Originally designed for the warning message displayed
 * when the user first views a custom tab.
 */
class Dialog extends Base {

  constructor(title, text) {
    super();
    this.title = title;
    this.text = text;
  }

  render() {
    // Container with background
    const container = document.createElement('div');
    container.classList.add('fsct-dialog-container');

    // Window
    const win = document.createElement('div');
    win.classList.add('fsct-dialog-window');
    container.appendChild(win);

    // Title
    if(this.title) {
      const title = document.createElement('div');
      title.classList.add('fs-h4', 'fsct-dialog-title');
      title.textContent = this.title;
      win.appendChild(title);
    }

    // Text
    if(this.text) {
      const text = document.createElement('div');
      text.classList.add('fsct-dialog-text');
      text.textContent = this.text;
      win.appendChild(text);
    }

    // Buttons
    const buttons = document.createElement('div');
    buttons.classList.add('fsct-dialog-buttons');
    win.appendChild(buttons);

    const button = document.createElement('button');
    button.classList.add('fs-button', 'fs-button--recommended');
    button.textContent = 'OK';
    button.addEventListener('click', function(){
      container.remove();
    });
    buttons.appendChild(button);

    return container;
  }

}

export default Dialog;