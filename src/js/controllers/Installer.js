import AvailableTabs from '../controllers/AvailableTabs.js';
import utils from '../utils.js';

class Installer {

  constructor() {
    this._installedTabs = new Map();
    this._onInstallTabCallbacks = [];
    this._onUninstallTabCallbacks = [];
    this._onLoadCallbacks = [];
    AvailableTabs.onLoad(() => {
      this._loadInstalledTabs();
    });
  }

  installTab(tab) {
    tab = utils.copy(tab);
    let installed = false;
    if(!this.isTabInstalled(tab.id)) {
      this._addInstalledTab(tab);
      this._saveInstalledTabs(() => {
        this._onInstallTabCallbacks.forEach(cb => {
          cb(tab);
        });
      });
    }
  }

  isTabInstalled(tabId) {
    return this._installedTabs.has(tabId);
  }

  uninstallTab(tabId) {
    if(this.isTabInstalled(tabId)) {
      this._installedTabs.delete(tabId);
      this._saveInstalledTabs(() => {
        this._onUninstallTabCallbacks.forEach(cb => {
          cb(tabId);
        });
      })
    }
  }

  onInstallTab(callback) {
    this._onInstallTabCallbacks.push(callback);
  }

  onLoad(callback) {
    this._onLoadCallbacks.push(callback);
  }

  onUninstallTab(callback) {
    this._onUninstallTabCallbacks.push(callback);
  }

  getInstalledTabs() {
    return Array.from(this._installedTabs.values());
  }

  _addInstalledTab(manifest) {
    if(manifest && manifest.id) {
      this._installedTabs.set(manifest.id, manifest);
    }
  }

  _saveInstalledTabs(callback) {
    chrome.storage.local.set({
      installed: JSON.stringify(this._generateInstalledTabStorage())
    }, callback);
  }

  _loadInstalledTabs() {
    chrome.storage.local.get({
      installed: JSON.stringify(this._defaultInstalledStorage())
    }, (items) => {
      let installed = JSON.parse(items.installed);
      this._installedTabs.clear();
      
      installed.packaged.forEach(tabId => {
        this._addInstalledTab(AvailableTabs.get(tabId));
      });

      installed.sideLoaded.forEach(manifest => {
        this._addInstalledTab(manifest);
      });

      this._onLoadCallbacks.forEach(cb => {
        cb(this.getInstalledTabs());
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
    return this.getInstalledTabs().reduce((accumulator, tab) => {
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