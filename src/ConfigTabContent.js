class ConfigTabContent extends Base {

  render() {
    var content = document.createElement('div');
    content.classList.add('custom-content', 'custom-configuration-content');
    
    var section = document.createElement('div');
    section.classList.add('rounded-section');
    content.appendChild(section);
    
    var wrap = document.createElement('div');
    wrap.classList.add('section-wrap');
    section.appendChild(wrap);

    var title = document.createElement('h4');
    title.textContent = 'Available Tabs';
    wrap.appendChild(title);

    // Add list of available tabs
    AvailableTabs.forEach(function(tab){
      wrap.appendChild(new AvailableTab(tab).dom());
    }.bind(this));

    return content;
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