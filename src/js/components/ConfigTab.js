import Tab from './Tab.js';
import ConfigTabContent from './ConfigTabContent.js';

class ConfigTab extends Tab {

  constructor() {
    super('+');
  }

  _createContent() {
    return new ConfigTabContent();
  }

}

export default ConfigTab;