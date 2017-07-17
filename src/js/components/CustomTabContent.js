import TabContent from './TabContent.js';

class CustomTabContent extends TabContent {

  constructor(url, urlData) {
    super();
    this.url = url;
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

    const iframe = document.createElement('iframe');
    iframe.src = this._constructUrl(this.url);
    wrap.appendChild(iframe);

    return content;
  }

  _constructUrl() {
    const data = this.urlData();
    let url = this.url;
    Object.keys(data).forEach(key => {
      url = url.replace(`{${key}}`, data[key]);
    });
    return url;
  }

}

export default CustomTabContent;