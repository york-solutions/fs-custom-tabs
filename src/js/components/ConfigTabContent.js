import TabContent from './TabContent.js';
import AvailableTab from './AvailableTab.js';
import AvailableTabs from '../controllers/AvailableTabs.js';
import Installer from '../controllers/Installer.js';

class ConfigTabContent extends TabContent {

  render() {
    const content = document.createElement('div');
    content.classList.add('custom-content', 'custom-configuration-content');
    
    const section = document.createElement('div');
    section.classList.add('rounded-section');
    content.appendChild(section);
    
    const container = document.createElement('div');
    container.classList.add('custom-content-container');
    section.appendChild(container);

    const title = document.createElement('h4');
    title.textContent = 'Available Tabs';
    container.appendChild(title);

    // List available tabs
    AvailableTabs.onLoad(() => {
      AvailableTabs.getAll().forEach((tab) => {
        container.appendChild(new AvailableTab(tab).dom());
      });
    });

    container.appendChild(this._renderSideloadContent());

    return content;
  }

  _renderSideloadContent() {
    const container = document.createElement('div');
    container.classList.add('sideload-container');

    // List sideloaded tabs
    const sideloadedTabs = Installer.getInstalledTabs().filter(t => t.sideLoaded);
    if(sideloadedTabs.length > 0) {
      const title = document.createElement('h4');
      title.textContent = 'Sideloaded Tabs';
      container.appendChild(title);

      sideloadedTabs.forEach(tab => {
        container.appendChild(new AvailableTab(tab).dom());
      });
    }

    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.style = 'display: none;';
    fileInput.addEventListener('change', () => {
      if(fileInput.files[0]) {
        console.log(fileInput.files[0]);
        this._loadManifestFile(fileInput.files[0]);
      }
    });
    container.appendChild(fileInput);

    const button = document.createElement('button');
    button.textContent = 'Sideload Tab';
    button.classList.add('fs-button');
    button.addEventListener('click', () => {
      fileInput.click();
    });
    container.appendChild(button);

    return container;
  }

  _loadManifestFile(file) {
    const reader = new FileReader();
    reader.onload = () => {
      const manifest = JSON.parse(reader.result);
      manifest.sideLoaded = true;
      Installer.installTab(manifest);
    };
    reader.readAsText(file);
  }

}

export default ConfigTabContent;