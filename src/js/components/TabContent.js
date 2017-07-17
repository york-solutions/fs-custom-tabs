import Base from './Base.js';

class TabContent extends Base {

  render() {
    return document.createElement('div');
  }

  show() {
    this._ensureDOM();
    this.$dom.classList.remove('hide');
  }

  hide() {
    this._ensureDOM();
    this.$dom.classList.add('hide');
  }

}

export default TabContent;