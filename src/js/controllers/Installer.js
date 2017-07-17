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
    this._installedTabs.push(tab);
    chrome.storage.local.set({
      // TODO: storing a copy of the data prevent us from being able to push automatic updates
      // Could only update a tab by uninstalling / reinstalling
      installed: JSON.stringify(this._installedTabs)
    }, () => {
      this._onInstallTabCallbacks.forEach(cb => {
        cb(tab);
      });
    });
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

  _loadInstalledTabs() {
    chrome.storage.local.get({
      'installed': '[]'
    }, (items) => {
      this._installedTabs = JSON.parse(items.installed);
      this._onLoadCallbacks.forEach(cb => {
        cb(utils.copy(this._installedTabs));
      })
    });
  }

}

// Singleton!
export default new Installer();