import Base from './Base.js';
import TabContent from './TabContent';

class Tab extends Base {

  constructor(text) {
    super();
    this.text = text;
    this.cacheContent = true;
  }

  render() {
    const tab = document.createElement('li');
    tab.classList.add('tab', 'custom-tab');
    
    var link = document.createElement('a');
    link.classList.add('tab-link');
    link.textContent = this.text;
    link.href = 'javascript:void(0);';
    link.addEventListener('click', () => {
      this.onClick(this);
    });

    tab.appendChild(link);

    return tab;
  }

  addHighlight() {
    this._ensureDOM();
    this.$dom.classList.add('tab-highlight');
  }

  removeHighlight() {
    this._ensureDOM();
    this.$dom.classList.remove('tab-highlight');
  }

  _createContent() {
    return new TabContent();
  }

  _isContentCreated() {
    return !!this.content;
  }

  _ensureContentCreated() {
    if(!this._isContentCreated()) {
      this.content = this._createContent();
    }
  }

  renderContent() {
    this._ensureContentCreated();
    return this.content.dom(!this.cacheContent);
  }

  showContent() {
    this._ensureContentCreated();
    this.content.show();
  }

  hideContent() {
    this._ensureContentCreated();
    this.content.hide();
  }

}

export default Tab;