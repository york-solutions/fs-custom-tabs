import Tab from './Tab.js';
import CustomTabContent from './CustomTabContent.js';

class CustomTab extends Tab {

  constructor(data) {
    super(data.title);
    this.data = data;
  }

  _createContent() {
    return new CustomTabContent(this.data.url);
  }

}

export default CustomTab;