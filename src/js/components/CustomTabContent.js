import Installer from '../controllers/Installer.js';
import TabContent from './TabContent.js';
import Dialog from './Dialog.js';
import Popup from './Popup';
import utils from '../utils';

class CustomTabContent extends TabContent {

  constructor(manifest, urlData) {
    super();
    this.manifest = manifest;
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
    info.classList.add('company');
    info.innerHTML = `<img src="${this.manifest.icon}"><div>Tab provided by: ${this.manifest.company} -&nbsp;</div>`;
    wrap.appendChild(info);

    const support = document.createElement('a');
    support.textContent = 'Support';
    support.href = 'javascript:void(0);';
    support.addEventListener('click', this.showPopup.bind(this));
    info.appendChild(support);
    
    const iframe = document.createElement('iframe');
    iframe.src = this._constructUrl(this.manifest.url);
    wrap.appendChild(iframe);

    if(!this.manifest._warningDismissed) {
      const dialog = new Dialog('Warning', 'The content of custom tabs is coming from another website provided by another company.', () => {
        Installer.warningDismissed(this.manifest.id);
        this.manifest._warningDismissed = true;
      });
      content.appendChild(dialog.dom());
    }

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
    return `<p>For support contact <a href="${this.manifest.support_url}" target="_blank">${this.manifest.company}</a>:<br/>
      <a href="tel:${this.manifest.phone}">${this.manifest.phone}</a><br/>
      <a href="mailto:${this.manifest.email}">${this.manifest.email}</a></p>`;
  }

  _constructUrl() {
    const data = this.urlData();
    let url = this.manifest.url;
    Object.keys(data).forEach(key => {
      url = url.replace(`{${key}}`, data[key]);
    });
    return url;
  }

}

export default CustomTabContent;