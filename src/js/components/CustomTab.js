import Tab from './Tab.js';
import CustomTabContent from './CustomTabContent.js';

class CustomTab extends Tab {

  constructor(data) {
    super(data.title);
    this.data = data;
    this.urlData = function(){};
  }

  _createContent() {
    return new CustomTabContent(this.data.url, this.urlData);
  }

}

export default CustomTab;