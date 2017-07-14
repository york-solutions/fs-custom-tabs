import utils from '../utils.js';

class Installer {

  constructor() {
    this._installedTabs = [];
    this._onInstallTabCallbacks = [];
  }

  installTab(tab) {
    tab = utils.copy(tab);
    this._installedTabs.push(tab);
    // TODO: update storage
    this._onInstallTabCallbacks.forEach(cb => {
      cb(tab);
    });
  }

  onInstallTab(callback) {
    this._onInstallTabCallbacks.push(callback);
  }

}

// Singleton!
export default new Installer();