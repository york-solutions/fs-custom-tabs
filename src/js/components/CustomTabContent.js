import TabContent from './TabContent.js';
import Popup from './Popup';
import utils from '../utils';

class CustomTabContent extends TabContent {

  constructor(data, urlData) {
    super();
    this.data = data;
    this.urlData = urlData;
  }

  render() {
    const content = document.createElement('div');
    content.classList.add('custom-content');
    
    const section = document.createElement('div');
    section.classList.add('rounded-section');
    content.appendChild(section);
    
    const wrap = document.createElement('div');
    wrap.classList.add('section-wrap');
    section.appendChild(wrap);

    const info = document.createElement('div');
    info.innerHTML = `Tab provided by: ${this.data.company} - `;
    wrap.appendChild(info);

    const support = document.createElement('a');
    support.textContent = 'Support';
    support.href = 'javascript:void(0);';
    support.addEventListener('click', this.showPopup.bind(this));
    info.appendChild(support);
    
    const iframe = document.createElement('iframe');
    iframe.src = this._constructUrl(this.data.url);
    wrap.appendChild(iframe);

    return content;
  }

  showPopup(event) {
    const $popup = new Popup(this.popupContent()).dom();
    document.body.appendChild($popup);

    // Position the popup just below the support link and horizontally centered the popup
    // with the link. We calculate the horizontal position by subtracting half the difference
    // in width between them from the left position of the support link.
    const supportPosition = utils.elementPosition(event.target);
    $popup.style.top = `${supportPosition.top + supportPosition.height}px`;
    $popup.style.left = `${supportPosition.left - (Math.abs(supportPosition.width - $popup.offsetWidth) / 2)}px`;

    // Remove (hide) the popup when anything is clicked.
    // We defer this until after the current click event stops bubbling
    // otherwise it immediately triggers after we attach the click listener.
    setTimeout(() => {
      const listener = () => {
        $popup.remove();
        document.body.removeEventListener('click', listener);
      };
      document.body.addEventListener('click', listener);
    });
  }

  popupContent() {
    return `<p>Contact ${this.data.company}:<br/><a href="tel:${this.data.phone}">${this.data.phone}</a><br/>
      <a href="mailto:${this.data.email}">${this.data.email}</a></p>`;
  }

  _constructUrl() {
    const data = this.urlData();
    let url = this.data.url;
    Object.keys(data).forEach(key => {
      url = url.replace(`{${key}}`, data[key]);
    });
    return url;
  }

}

export default CustomTabContent;