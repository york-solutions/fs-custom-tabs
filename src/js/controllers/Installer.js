import AvailableTabs from '../components/AvailableTabs.js';
import utils from '../utils.js';

class Installer {

  constructor() {
    this._installedTabs = [];
    this._onInstallTabCallbacks = [];
    this._onLoadCallbacks = [];
    this._loadInstalledTabs();
  }

  installTab(tab) {
    tab = utils.copy(tab);
    let installed = false;
    for(let i = 0; i < this._installedTabs.length && !installed; i++) {
      if(this._installedTabs[i].id === tab.id) {
        installed = true;
      }
    }
    if(!installed) {
      this._installedTabs.push(tab);
      this._saveInstalledTabs(() => {
        this._onInstallTabCallbacks.forEach(cb => {
          cb(tab);
        });
      });
    }
  }

  onInstallTab(callback) {
    this._onInstallTabCallbacks.push(callback);
  }

  onLoad(callback) {
    this._onLoadCallbacks.push(callback);
  }

  getInstalledTabs() {
    return this._installedTabs.map(t => utils.copy(t));
  }

  _saveInstalledTabs(callback) {
    chrome.storage.local.set({
      installed: JSON.stringify(this._generateInstalledTabStorage())
    }, callback);
  }

  _loadInstalledTabs() {
    chrome.storage.local.get({
      'installed': JSON.stringify(this._defaultInstalledStorage())
    }, (items) => {
      let installed = JSON.parse(items.installed);
      this._installedTabs = [];
      
      installed.packaged.forEach(tabId => {
        const manifest = AvailableTabs.get(tabId);
        if(manifest) {
          this._installedTabs.push(manifest);
        }
      });

      installed.sideLoaded.forEach(manifest => {
        this._installedTabs.push(manifest);
      });

      this._onLoadCallbacks.forEach(cb => {
        cb(utils.copy(this._installedTabs));
      });
    });
  }

  /**
   * We want to store the entire manifest for side-loaded tabs
   * but for packaged tabs we only store the ID so that they
   * can be updated automatically. Otherwise packaged tabs could
   * only be updated by uninstalling and reinstalling the tab.
   */
  _generateInstalledTabStorage() {
    return this._installedTabs.reduce((accumulator, tab) => {
      if(tab.sideLoaded) {
        accumulator.sideLoaded.push(tab);
      } else {
        accumulator.packaged.push(tab.id);
      }
      return accumulator;
    }, this._defaultInstalledStorage());
  }

  _defaultInstalledStorage() {
    return {
      packaged: [],
      sideLoaded: []
    };
  }

}

// Singleton
export default new Installer();