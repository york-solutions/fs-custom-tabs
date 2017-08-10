import Base from './Base.js';
import utils from '../utils.js';
import Installer from '../controllers/Installer.js';

class AvailableTab extends Base {

  constructor(manifest) {
    super();
    this.manifest = utils.copy(manifest);
  }

  render() {
    const tab = document.createElement('div');
    tab.classList.add('available-tab');

    const icon = document.createElement('div');
    icon.classList.add('icon');
    icon.style.backgroundImage = `url(${this.manifest.icon})`;
    icon.style.backgroundSize = '';
    tab.appendChild(icon);

    const descr = document.createElement('p');
    descr.textContent = this.manifest.description;
    tab.appendChild(descr);

    const button = document.createElement('button');
    tab.appendChild(button);

    if(Installer.isTabInstalled(this.manifest.id)) {
      button.textContent = 'Remove';
      button.addEventListener('click', () => {
        Installer.uninstallTab(this.manifest.id);
      });
    } else {
      button.textContent = '+ Add';
      button.addEventListener('click', () => {
        Installer.installTab(this.manifest);
      });
    }

    return tab;
  }

}

export default AvailableTab;