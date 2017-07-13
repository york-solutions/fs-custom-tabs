class ConfigTab extends Base {

  constructor() {
    super();
    this.onClick = function(){};
  }

  render() {
    var self = this;      

    var configTab = document.createElement('li');
    configTab.classList.add('tab', 'custom-tab');
    configTab.id = 'custom-config-tab';
    
    var configLink = document.createElement('a');
    configLink.classList.add('tab-link');
    configLink.textContent = '+';
    configLink.href = 'javascript:void(0);';
    configLink.addEventListener('click', function(){
      self.onClick();
    });

    configTab.appendChild(configLink);

    return configTab;
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