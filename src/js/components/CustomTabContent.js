import TabContent from './TabContent.js';

class CustomTabContent extends TabContent {

  constructor(url) {
    super();
    this.url = url;
  }

  render() {
    var content = document.createElement('div');
    content.classList.add('custom-content');
    
    var section = document.createElement('div');
    section.classList.add('rounded-section');
    content.appendChild(section);
    
    var wrap = document.createElement('div');
    wrap.classList.add('section-wrap');
    section.appendChild(wrap);

    var iframe = document.createElement('iframe');
    iframe.src = this.url;
    wrap.appendChild(iframe);

    return content;
  }

}

export default CustomTabContent;