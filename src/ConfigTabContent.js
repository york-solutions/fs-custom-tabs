class ConfigTabContent extends Base {

  render() {
    var section = document.createElement('div');
    section.classList.add('custom-content', 'custom-configuration-content');
    section.textContent = 'Custom tab configuration';
    return section;
  }

  show() {
    if(this.$dom) {
      this.$dom.classList.remove('hide');
    }
  }

  hide() {
    if(this.$dom) {
      this.$dom.classList.add('hide');
    }
  }

}