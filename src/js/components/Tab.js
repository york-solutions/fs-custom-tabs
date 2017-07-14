import Base from './Base.js';

class CustomTab extends Base {

  constructor(text) {
    super();
    this.onClick = function(){};
    this.text = text;
  }

  render() {
    const tab = document.createElement('li');
    tab.classList.add('tab', 'custom-tab');
    
    var link = document.createElement('a');
    link.classList.add('tab-link');
    link.textContent = this.text;
    link.href = 'javascript:void(0);';
    link.addEventListener('click', () => {
      this.onClick();
    });

    tab.appendChild(link);

    return tab;
  }

  addHighlight() {
    if(this.$dom) {
      this.$dom.classList.add('tab-highlight');
    }
  }

  removeHighlight() {
    if(this.$dom) {
      this.$dom.classList.remove('tab-highlight');
    }
  }

}

export default CustomTab;