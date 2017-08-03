import TabContent from './TabContent.js';

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
    support.addEventListener('click', () => {
      console.log('show support popup');
    });
    info.appendChild(support);
    
    const iframe = document.createElement('iframe');
    iframe.src = this._constructUrl(this.data.url);
    wrap.appendChild(iframe);

    return content;
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