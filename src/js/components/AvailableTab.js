import Base from './Base.js';
import utils from '../utils.js';
import Installer from '../controllers/Installer.js';

class AvailableTab extends Base {

  constructor(data) {
    super();
    this.data = utils.copy(data);
  }

  render() {
    const tab = document.createElement('div');
    tab.classList.add('available-tab');

    const icon = document.createElement('img');
    icon.src = this.data.icon;
    tab.appendChild(icon);

    const descr = document.createElement('p');
    descr.textContent = this.data.description;
    tab.appendChild(descr);

    const button = document.createElement('button');
    button.textContent = '+ Add';
    tab.appendChild(button);
    tab.addEventListener('click', () => {
      Installer.installTab(this.data);
    });

    return tab;
  }

}

export default AvailableTab;