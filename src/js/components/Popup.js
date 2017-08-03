import Base from './Base.js';

/**
 * This was designed for use as the support link popup on custom tabs.
 * Use caution when adapting for other purposes.
 */
class Popup extends Base {

  constructor(content) {
    super();
    this.content = content;
  }

  render() {
    const popup = document.createElement('div');
    popup.classList.add('popup');

    const tip = document.createElement('div');
    tip.classList.add('popup-tip');
    popup.appendChild(tip);

    const body = document.createElement('div');
    body.classList.add('popup-body');
    if(this.content instanceof Element) {
      body.appendChild(this.content);
    } else if(typeof this.content === 'string') {
      body.innerHTML = this.content;
    }
    popup.appendChild(body);

    return popup;
  }

}

export default Popup;